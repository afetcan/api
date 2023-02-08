import { CONTEXT, Inject, Injectable, Scope } from 'graphql-modules'
import sharp from 'sharp'
import type { Context, SuperTokenSessionPayload } from '../../../context'
import { AuthManager } from '../../auth/service/auth-manager.service'
import { ArtifactStorageWriter } from '../../shared/providers/artifact-storage-writer'
import { Logger } from '../../shared/providers/logger'
import { HStorage } from '../../shared/providers/storage'

/**
 * Responsible for auth checks.
 * Talks to Storage.
 */
@Injectable({
  scope: Scope.Operation,
})
export class UploadManager {
  private session: SuperTokenSessionPayload | null
  private logger: Logger
  constructor(
    @Inject(CONTEXT) context: Context,
    @Inject(HStorage) private storage: HStorage,
    @Inject(AuthManager) private authManager: AuthManager,
    @Inject(Logger) logger: Logger,

    @Inject(ArtifactStorageWriter) private artifactStorageWriter: ArtifactStorageWriter,
  ) {
    this.session = context.session || null
    this.logger = logger
  }

  saveProfileImage = async (file: File) => {
    const user = await this.authManager.getCurrentUser()

    // get readableStream from blob
    const readableStream = file.stream()
    const stream = readableStream.getReader()
    let _file: Buffer | undefined
    while (true) {
      // for each iteration: value is the next blob fragment
      const { done, value } = await stream.read()
      if (done) {
        // no more data in the stream
        break
      }

      if (value)
        _file = Buffer.concat([_file || Buffer.alloc(0), Buffer.from(value)])
    }

    if (_file) {
      try {
        const image = sharp(_file).resize(600, 600).toFormat('webp').webp()

        const smallImg = sharp(_file).resize(80, 80, {
          withoutEnlargement: true,
          fit: 'inside',
        })

        const small = await smallImg.toBuffer({ resolveWithObject: true })

        const blurHash = await this.createBlurHash(smallImg, small.info)

        const buffer = await image.toBuffer()
        try {
          const { ETag } = await this.artifactStorageWriter.writeArtifact({
            artifact: buffer,
            artifactType: 'webp',
            key: `u/${user.profileImage}.webp`,
            metadata: {
              width: '600',
              height: '600',
            },
          })
          if (ETag) {
            await this.storage.userRepo.updateProfileImage({
              id: user.id,
              profileImage: user.profileImage,
              profileImageBlurHash: blurHash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
            })
          }
        }
        catch (error) {
          console.error(error)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  async createBlurHash(
    img: sharp.Sharp,
    meta: sharp.OutputInfo,
  ): Promise<string | undefined> {
    /**
     * @note that the raw img data removes the size/meta data
     * thats why its passed in above
     */
    const alphaImg = img.raw().ensureAlpha()
    const pixelBuffer = await alphaImg.toBuffer()

    const { width, height } = meta || {}

    if (!width || !height) {
      this.logger.warn('could not create blurhash (no meta info)')
      return
    }

    const bh = await import('blurhash')

    const blurhash = bh.encode(
      new Uint8ClampedArray(pixelBuffer),
      width,
      height,
      4,
      4,
    )

    if (bh.isBlurhashValid(blurhash))
      return blurhash
  }
}

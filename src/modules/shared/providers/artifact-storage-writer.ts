import { PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'

const artifactMeta = {
  sdl: {
    contentType: 'text/plain',
    preprocessor: (rawValue: unknown) => String(rawValue),
  },
  supergraph: {
    contentType: 'text/plain',
    preprocessor: (rawValue: unknown) => String(rawValue),
  },
  metadata: {
    contentType: 'application/json',
    preprocessor: (rawValue: unknown) => JSON.stringify(rawValue),
  },
  services: {
    contentType: 'application/json',
    preprocessor: (rawValue: unknown) => JSON.stringify(rawValue),
  },
  webp: {
    contentType: 'image/webp',
    preprocessor: (rawValue: any) => {
      return rawValue as Buffer
    },
  },
} as const

/**
 * Write an Artifact to an S3 bucket.
 */
export class ArtifactStorageWriter {
  constructor(private s3Client: S3Client, private bucketName: string) {}

  async writeArtifact(args: {
    artifactType: keyof typeof artifactMeta
    artifact: unknown
    key: string
    metadata?: Record<string, string>
  }) {
    const meta = artifactMeta[args.artifactType]
    const _metaData = args.metadata || {}
    const putCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: args.key,
      ContentType: meta.contentType,
      Metadata: _metaData,
      Body: meta.preprocessor(args.artifact),
    })

    return await this.s3Client.send(putCommand)
  }
}

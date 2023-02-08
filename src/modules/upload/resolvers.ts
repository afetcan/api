import { UploadManager } from './service/upload-manager.service'
import type { UploadModule } from './__generated__/types'
export const resolvers: UploadModule.Resolvers = {

  Mutation: {
    profileImageUpload: async (_, { file }: { file: File }, { injector }) => {
      await injector.get(UploadManager).saveProfileImage(file)

      return 'a'
    },

  },
}

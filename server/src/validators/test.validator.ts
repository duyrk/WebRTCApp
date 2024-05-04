import { JoiInstance } from '.'

export const TestSchema = {
  body: JoiInstance.object({
    name: JoiInstance.string().required(),
  }),
}

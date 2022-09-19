import testsRepository from '../repositories/testsRepositority'
import supabaseConfig from '../utils/supabaseConfig'
import { ITest } from '../types/testTypes'

const supabase = supabaseConfig()

function insert(test: ITest) {
  return testsRepository.insert(test)
}

function getByTeachers() {
  return testsRepository.getByTeachers()
}

function getByDisciplines() {
  return testsRepository.getByDisciplines()
}

async function pdfUrl(file: any) {
  const fileName = Date.now() + file.originalname

  await supabase.storage.from('pdf-tests').upload(fileName, file.buffer, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.mimetype
  })

  const { publicURL } = supabase.storage
    .from('pdf-tests')
    .getPublicUrl(fileName)

  return publicURL
}

export default { insert, getByTeachers, getByDisciplines, pdfUrl }

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
  await supabase.storage
    .from('pdf-tests')
    .upload(Date.now() + file.originalname, file.buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.mimetype
    })

  const { publicURL } = supabase.storage
    .from('pdf-tests')
    .getPublicUrl(file.originalname)

  return publicURL
}

export default { insert, getByTeachers, getByDisciplines, pdfUrl }

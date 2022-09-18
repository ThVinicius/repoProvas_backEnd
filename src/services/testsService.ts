import { createClient } from '@supabase/supabase-js'
import testsRepository from '../repositories/testsRepositority'
import { ITest } from '../types/testTypes'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

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
    .upload(file.originalname, file.buffer, {
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

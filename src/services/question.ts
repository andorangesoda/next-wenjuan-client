import { get, post } from './ajax'

/**
 * 获取单个问卷
 * @param id 问卷ID
 * @returns 
 */
export async function getQuestionById(id: string) {
  const url = `/api/question/${id}`
  const data = await get(url)
  return data
}

/**
 * 保存答卷
 * @param 答卷信息 
 * @returns 
 */
export async function saveAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)
  return data
}
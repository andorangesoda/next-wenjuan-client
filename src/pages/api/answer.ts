import type { NextApiRequest, NextApiResponse } from 'next'
import { saveAnswer } from '@/services/question'

/**
 * 处理提交的答卷。当发送请求到 /api/answer 路径时，该方法就会被执行
 * @param req  
 * @param res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') {
    res.status(200).json({ errno: -1, msg: 'Method 错误' })
  }

  try {
    const answerInfo = formatAnswerInfo(req.body)
    // 提交到服务端
    const resData = await saveAnswer(answerInfo)
    if (resData.errno === 0) {
      res.redirect('/success')
    } else {
      res.redirect('/fail')
    }
  } catch (err) {
    res.redirect('/fail')
  }
}

/**
 * 格式化答卷信息
 * @param reqBody 
 * @returns 
 */
function formatAnswerInfo(reqBody: any) {
  console.log('answerinfo: ', JSON.stringify(reqBody))

  const answerList: any[] = []

  Object.keys(reqBody).forEach(key => {
    if (key === 'questionId') return
    answerList.push({
      componentId: key,
      value: reqBody[key]
    })
  })

  return {
    questionId: reqBody.questionId || '',
    answerList
  }
}
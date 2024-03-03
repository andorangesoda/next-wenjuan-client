import QuestionTitle from './QuestionTitle'
import QuestionInput from './QuestionInput'

type ComponentInfoType = {
  fe_id: string
  type: string
  // title: string
  isHidden: string
  props: any
}

export const getComponent = (comp: ComponentInfoType) => {
  const {fe_id, type, isHidden, props = {} } = comp
  // 无类型，或是隐藏状态，直接返回
  if (!type || isHidden) return null

  switch (type) {
    case 'questionTitle': return <QuestionTitle {...props} />
    case 'questionInput': return <QuestionInput fe_id={fe_id} {...props} />
    default: return null
  }
}
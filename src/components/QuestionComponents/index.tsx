import QuestionTitle from './QuestionTitle'

type ComponentInfoType = {
  fe_id: string
  type: string
  // title: string
  isHidden: string
  props: any
}

export const getComponent = (comp: ComponentInfoType) => {
  const { type, isHidden, props = {} } = comp
  // 无类型，或是隐藏状态，直接返回
  if (!type || isHidden) return null

  switch (type) {
    case 'questionTitle': return <QuestionTitle {...props} />
    default: return null
  }
}
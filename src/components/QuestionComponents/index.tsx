import QuestionTitle from './QuestionTitle'
import QuestionInput from './QuestionInput'
import QuestionInfo from './QuestionInfo'
import QuestionParagraph from './QuestionParagraph'
import QuestionTextarea from './QuestionTextarea'
import QuestionRadio from './QuestionRadio'
import QuestionCheckbox from './QuestionCheckbox'

type ComponentInfoType = {
  fe_id: string
  type: string
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
    case 'questionInfo': return <QuestionInfo {...props} />
    case 'questionParagraph': return <QuestionParagraph {...props} />
    case 'questionTextarea': return <QuestionTextarea fe_id={fe_id} props={props} />
    case 'questionRadio': return <QuestionRadio fe_id={fe_id} props={props} />
    case 'questionCheckbox': return <QuestionCheckbox fe_id={fe_id} props={props} />
    default: return null
  }
}
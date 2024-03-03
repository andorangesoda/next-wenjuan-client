import PageWrapper from '@/components/PageWrapper'
import { getQuestionById } from '@/services/question'
import { getComponent } from '@/components/QuestionComponents'
import styles from '@/styles/Question.module.scss'

/**
 * [id].tsx 是具有动态路由的页面。
 * 可以通过 pages/question/1 、pages/question/2 等类似路径访问。
 */
type PropsType = {
  errno: number,
  data?: {
    id: string
    title: string
    desc?: string
    isPublished: boolean
    isDeleted: boolean
    componentList: Array<any>
  }
  msg?: string
}
export default function Question(props: PropsType){
  const { errno, data, msg = '' } = props
  // 数据错误
  if (errno !== 0) {
    return <PageWrapper title="错误">
      <h1>{msg}</h1>
    </PageWrapper>
  }

  const { id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {}
  // 已经被删除的，提示错误
  if (isDeleted) {
    return <PageWrapper title={title}>
      <h1>该问卷已经被删除</h1>
    </PageWrapper>
  }
  // 尚未发布的，提示错误
  if (!isPublished) {
    return <PageWrapper title={title}>
      <h1>该问卷尚未发布</h1>
    </PageWrapper>
  }

  // 遍历组件
  const ComponentListElem = <>
    {componentList.map(c => {
      const ComponentElem = getComponent(c)
      return <div key={c.fe_id} className={styles.componentWrapper}>
        {ComponentElem}
      </div>
    })}
  </>
  
  return <PageWrapper title={title} desc={desc}>
    {/* 这里提交，触发到 pages/api/answer.ts 中 handler 方法执行。 */}
    <form method='post' action="/api/answer">
      <input type="hidden" name="questionId" value={id}/>
      {ComponentListElem}
      <div className={styles.submitBtnContainer}>
        <button type="submit">提交</button>
      </div>
    </form>
  </PageWrapper>
}

/**
 * getServerSideProps 是固定写法，即使用 SSR 服务端渲染
 * @param context 
 * @returns 
 */
export async function getServerSideProps(context: any) {
  console.log('getServerSideProps执行...');
  
  const { id = '' } = context.params
  // 根据 id 获取问卷数据
  const data = await getQuestionById(id)
  return {
    props: data
  }
}
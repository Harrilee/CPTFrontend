import React, { useEffect, useState, useRef } from 'react'
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import style from './Home.module.scss'
import Nav from 'react-bootstrap/Nav'
import { Task } from '../Task/Task'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL, validateLogin, signOut } from '../../utility'
import Spinner from 'react-bootstrap/Spinner';
import { TimeOutAlert } from '../TimeOutAlert/TimeOutAlert'
import Overlay from 'react-bootstrap/Overlay'
import moment from 'moment'


enum Rule {
    'basic', // isValidUser, equalDayProgress, isValidTimeRange, hasNotOverdue
    'feedback', // hasFeedback
    'writing23', // basic, qualityCheck
    'writing8101214day29', // basic, qualityCheck, viewedFeedback
    'video', // isValidUser, afterEarlistStartDate, qualityCheck
    'global', // isValidUser, hasNotOverdue -> this is for global display
}

const tasks = [
    {
        day: 1,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day1',
        rule: Rule.basic
    },
    {

        day: 1.1,
        questionType: '自由写作',
        timeToFinish: 30,
        taskURL: '/writing1',
        rule: Rule.basic
    },
    {
        day: 2,
        questionType: '自由写作',
        timeToFinish: 30,
        taskURL: '/writing2',
        rule: Rule.writing23
    },
    {
        day: 3,
        questionType: '自由写作',
        timeToFinish: 30,
        taskURL: '/writing3',
        rule: Rule.writing23
    },
    {
        day: 4,
        questionType: '科普视频',
        timeToFinish: 10,
        taskURL: '/video4',
        rule: Rule.video
    },
    {
        day: 4.1,
        questionType: '游戏',
        timeToFinish: 30,
        taskURL: '/game',
        rule: Rule.basic
    },
    {
        day: 5,
        questionType: '游戏',
        timeToFinish: 30,
        taskURL: '/game',
        rule: Rule.basic
    },
    {
        day: 6,
        questionType: '挑战型写作',
        timeToFinish: 30,
        taskURL: '/writing6',
        rule: Rule.basic
    },
    {
        day: 7,
        questionType: '阅读反馈',
        timeToFinish: 10,
        taskURL: '/feedback6',
        rule: Rule.feedback
    },
    {
        day: 8,
        questionType: '挑战型写作',
        timeToFinish: 30,
        taskURL: '/writing8',
        rule: Rule.writing8101214day29
    },
    {
        day: 9,
        questionType: '阅读反馈',
        timeToFinish: 10,
        taskURL: '/feedback8',
        rule: Rule.feedback
    },
    {
        day: 10,
        questionType: '挑战型写作',
        timeToFinish: 30,
        taskURL: '/writing10',
        rule: Rule.writing8101214day29
    },
    {
        day: 11,
        questionType: '阅读反馈',
        timeToFinish: 10,
        taskURL: '/feedback10',
        rule: Rule.feedback
    },
    {
        day: 12,
        questionType: '信件写作',
        timeToFinish: 30,
        taskURL: '/writing12',
        rule: Rule.writing8101214day29
    },
    {
        day: 13,
        questionType: '阅读反馈',
        timeToFinish: 10,
        taskURL: '/feedback12',
        rule: Rule.feedback
    },
    {
        day: 14,
        questionType: '信件写作',
        timeToFinish: 30,
        taskURL: '/writing14',
        rule: Rule.writing8101214day29
    },
    {
        day: 15,
        questionType: '阅读反馈',
        timeToFinish: 10,
        taskURL: '/feedback14',
        rule: Rule.feedback
    },
    {
        day: 29,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day29',
        rule: Rule.writing8101214day29
    },
    {
        day: 45,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day45',
        rule: Rule.basic
    },
    {
        day: 105,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day105',
        rule: Rule.basic
    }
]

export function Home() {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState({
        day: NaN,
        score: NaN,
        startDate: moment().format('YYYY-MM-DD'),
        banFlag: false,
        banReason: "",

        writingDay1QualityCheck: false,
        writingDay2QualityCheck: false,
        writingDay3QualityCheck: false,

        writingDay6QualityCheck: false,
        feedbackDay6: "",
        feedbackDay6Viewed: false,

        writingDay8QualityCheck: false,
        feedbackDay8: "",
        feedbackDay8Viewed: false,

        writingDay10QualityCheck: false,
        feedbackDay10: "",
        feedbackDay10Viewed: false,

        writingDay12QualityCheck: false,
        feedbackDay12: "",
        feedbackDay12Viewed: false,

        writingDay14QualityCheck: false,
        feedbackDay14: "",
        feedbackDay14Viewed: false,
    })
    const [refreshPop, setRefreshPop] = useState(false)
    const refreshRef = useRef(null)

    // const signOut = () => {
    //     // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    //     window.location.href = '/'
    // }

    const elicitUserState = async () => {
        const res = await fetch(URL + 'api/info/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        })
        const response = await res.json()
        if (response.status === 'Success') {
            const msg = JSON.parse(response.message)
            setInfo(msg)
            setLoading(false)
        }
    }

    class AcsMngr {
        // if backend allow this user to continue experiment (BE: banFlag)
        static isValidUser(): true | string {
            if (info.banFlag) {
                return "(isValidUser) 后台禁止用户访问，原因 [" + info.banReason + "]。请联系管理员"
            }
            return true
        }

        // within the valid day range
        // user experiment progress defined as a finite state machine (the old day and setDay)
        static equalDayProgress(taskDay: number): true | string {
            if (Number(info.day) == taskDay)
                return true
            else
                return "(equalDayProgress) 当前任务编号为" + taskDay + "，与当前用户的任务编号：[" + info.day + "] 不一致。"
        }

        // after eairlist start date
        // user experiment time range defined as a time range (the old time and setTime)
        static afterEarlistStartDate(taskDay: number): true | string {
            const startDate = moment(info.startDate)
            const currentTaskDay = Math.floor(taskDay)
            // earlist start date = user_experiment_start_date + (current_task_day - 1) + 4 hours (4 am)
            // 任务开启当天的4点开始
            const earlistStartDate = startDate.clone().add(currentTaskDay - 1, 'days').add(4, 'hours')
            // if current time is after the earlist start date
            if (moment().isAfter(earlistStartDate)) {
                return true
            }
            return "(afterEarlistStartDate) 未到达任务开启时间。开启时间为" + earlistStartDate.format('YYYY-MM-DD HH:mm:ss') + "。"
        }

        // if local time is within the time range of the task
        static isValidTimeRange(taskDay: number): true | string {
            const startDate = moment(info.startDate)
            const currentTaskDay = Math.floor(taskDay)
            // earlist start date = user_experiment_start_date + (current_task_day - 1) + 4 hours (4 am)
            // 任务开启当天的4点开始
            const earlistStartDate = startDate.clone().add(currentTaskDay - 1, 'days').add(4, 'hours')
            // latest start date = user_experiment_start_date + (current_task_day + 1) + 9 hours (9 am)
            // 任务开启第三天9点结束
            const latestStartDate = startDate.clone().add(currentTaskDay + 1, 'days').add(9, 'hours')
            // if current time is within the time range
            if (moment().isBetween(earlistStartDate, latestStartDate)) {
                return true
            }
            return "(isValidTimeRange) 当前时间不在任务开启时间范围内。开启时间为" + earlistStartDate.format('YYYY-MM-DD HH:mm:ss') + "，结束时间为" + latestStartDate.format('YYYY-MM-DD HH:mm:ss') + "。"
        }

        // if user has not overdue
        static hasNotOverdue(): true | string {
            const startDate = moment(info.startDate)
            const currentTaskDay = Math.floor(info.day)
            // latest start date = user_experiment_start_date + (current_task_day + 1) + 9 hours (9 am)
            // 任务开启第三天9点结束
            const latestStartDate = startDate.clone().add(currentTaskDay + 1, 'days').add(9, 'hours')
            // if current time is within the time range
            if (moment().isBefore(latestStartDate)) {
                return true
            }
            return "(hasNotOverdue) 您有超时未提交的任务。结束时间为" + latestStartDate.format('YYYY-MM-DD HH:mm:ss') + "。超过2天未完成任务的用户将自动丢失继续参与研究的资格。如有疑问，请联系管理员。"
        }

        // if user has view the feedback
        static viewedFeedback(taskDay: number): true | string {
            switch (taskDay) {
                case 8:
                    if (info.feedbackDay6Viewed)
                        return true
                    else
                        return "(viewedFeedback) 请先查看第6天的反馈。"
                case 10:
                    if (info.feedbackDay8Viewed)
                        return true
                    else
                        return "(viewedFeedback) 请先查看第8天的反馈。"
                case 12:
                    if (info.feedbackDay10Viewed)
                        return true
                    else
                        return "(viewedFeedback) 请先查看第10天的反馈。"
                case 14:
                    if (info.feedbackDay12Viewed)
                        return true
                    else
                        return "(viewedFeedback) 请先查看第12天的反馈。"
                case 29:
                    if (info.feedbackDay14Viewed)
                        return true
                    else
                        return "(viewedFeedback) 请先查看第14天的反馈。"
                default:
                    console.error("viewedFeedback: taskDay is not in the list")
                    return "(viewedFeedback) 这是一个程序错误。请通知管理员联系开发者。"

            }
        }

        // if user has passed the quality check
        static qualityCheck(taskDay: number): true | string {
            switch (taskDay) {
                case 2:
                    if (info.writingDay1QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第1天写作未通过后台核验，请联系管理员。"
                case 3:
                    if (info.writingDay2QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第2天写作未通过后台核验，请联系管理员。"
                case 4:
                    if (info.writingDay3QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第3天写作未通过后台核验，请联系管理员。"
                case 8:
                    if (info.writingDay6QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第6天写作未通过后台核验，请联系管理员。"
                case 10:
                    if (info.writingDay8QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第8天写作未通过后台核验，请联系管理员。"
                case 12:
                    if (info.writingDay10QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第10天写作未通过后台核验，请联系管理员。"
                case 14:
                    if (info.writingDay12QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第12天写作未通过后台核验，请联系管理员。"
                case 29:
                    if (info.writingDay14QualityCheck)
                        return true
                    else
                        return "(qualityCheck) 您的第14天写作未通过后台核验，请联系管理员。"
                default:
                    console.error("qualityCheck: taskDay is not in the list")
                    return "(qualityCheck) 这是一个程序错误。请通知管理员联系开发者。"
            }
        }

        // if user has feedback, they should not be able to access the task
        static hasFeedback(taskDay: number): true | string {
            switch (taskDay) {
                case 7:
                    if (info.feedbackDay6 !== "")
                        return true
                    else
                        return "(hasFeedback) 管理员还未为您提供第6天的反馈。"
                case 9:
                    if (info.feedbackDay8 !== "")
                        return true
                    else
                        return "(hasFeedback) 管理员还未为您提供第8天的反馈。"
                case 11:
                    if (info.feedbackDay10 !== "")
                        return true
                    else
                        return "(hasFeedback) 管理员还未为您提供第10天的反馈。"
                case 13:
                    if (info.feedbackDay12 !== "")
                        return true
                    else
                        return "(hasFeedback) 管理员还未为您提供第12天的反馈。"
                case 15:
                    if (info.feedbackDay14 !== "")
                        return true
                    else
                        return "(hasFeedback) 管理员还未为您提供第14天的反馈。"
                default:
                    console.error("hasFeedback: taskDay is not in the list")
                    return "(hasFeedback) 这是一个程序错误。请通知管理员联系开发者。"
            }
        }


        // check access with given task day and requirements
        static checkAccess(taskDay: number, rule: Rule): true | string[] {
            const reasons: string[] = []
            const check = (result: true | string) => {
                if (result !== true) {
                    reasons.push(result)
                }
            }
            if (rule === Rule.basic || rule === Rule.writing23 || rule === Rule.writing8101214day29) {
                check(this.isValidUser())
                check(this.equalDayProgress(taskDay))
                check(this.isValidTimeRange(taskDay))
                check(this.hasNotOverdue())
            }
            switch (rule) {
                case Rule.feedback:
                    check(this.hasFeedback(taskDay))
                    break
                case Rule.writing23:
                    check(this.qualityCheck(taskDay))
                    break
                case Rule.writing8101214day29:
                    check(this.qualityCheck(taskDay))
                    check(this.viewedFeedback(taskDay))
                    break
                case Rule.video:
                    check(this.isValidUser())
                    check(this.afterEarlistStartDate(taskDay))
                    check(this.qualityCheck(taskDay))
                    break
                case Rule.global:
                    check(this.isValidUser())
                    check(this.hasNotOverdue())
                    break
            }
            if (reasons.length === 0)
                return true
            else
                return reasons
        }
    }

    useEffect(() => {
        const response = async () => {
            const result = await validateLogin()
            if (result === false) {
                signOut()
                window.location.href = '/'
            }
        }
        response().catch(e => {
            console.error(e)
        })
    })

    useEffect(() => {
        const response = async () => {
            await elicitUserState()
        }

        response().catch(e => {
            console.error(e)
        })
    }, [])

    const globalAccess = AcsMngr.checkAccess(0, Rule.global)

    const Main = () => {
        return <div className={style.container}>
            <div className={style.rightPanel}>
                <div className={style.rightContainer}>
                    <div className={style.topTitle}>欢迎回来，用户 {getEncryptedUsernameFromCookie()}</div>
                    {globalAccess === true ? <></> :

                        <div className={style.errorContainer}>
                            <p>您暂时无法参与后续研究，请联系管理员。系统检测到原因如下</p>
                            {globalAccess.map((reason, index) => {
                                return <div className={style.errorCard} key={index}>{reason}</div>
                            })}
                            <p>您所支付的9.9元参与费将于第105天最后一次随访评估后三天内原路返回您的账户。再次感谢您的支持！</p>
                        </div>


                    }
                    <div className={style.topContainer}>
                        <div className={style.topCard}>
                            <div>今天，是您坚持参与本次训练营的第{parseInt(info.day.toString())}天</div>
                        </div>
                        <div className={style.topCard}>累计得分: {info.score}分</div>
                    </div>
                    <div className={style.bottomTitle}>
                        任务列表{' '}
                        <span
                            className={style.refresh}
                            onClick={() => {
                                if (!refreshPop) {
                                    elicitUserState()
                                    setRefreshPop(true)
                                    setTimeout(() => {
                                        setRefreshPop(false)
                                    }, 1000)
                                }
                            }}
                            ref={refreshRef}
                        >
                            刷新
                        </span>
                        <Overlay target={refreshRef.current} show={refreshPop} placement="right">
                            <div
                                style={{
                                    backgroundColor: '#5A57FF',
                                    padding: '2px 5px',
                                    color: 'white',
                                    borderRadius: '2px',
                                    fontSize: '0.8em',
                                }}
                            >
                                刷新成功
                            </div>
                        </Overlay>
                    </div>
                    <div className={style.bottomContainer}>
                        {
                            tasks.map(task => <Task
                                key={task.day}
                                currentDay={info.day}
                                days={task.day}
                                questionType={task.questionType}
                                timeToFinish={task.timeToFinish}
                                taskURL={task.taskURL}
                                isOpen={AcsMngr.checkAccess(task.day, task.rule)} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    }

    return (
        <div>
            <Header />
            {
                loading ?
                    <div className={style.loading}>
                        <Spinner id={style.spinner} animation="border" role="status" />
                </div>
                :
                <Main />
        }
            <Footer />
        </div>
    )
}



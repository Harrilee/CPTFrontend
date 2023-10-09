import React, { useEffect, useState, useRef } from 'react'
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import style from './Home.module.scss'
import Nav from 'react-bootstrap/Nav'
import { Task } from '../Task/Task'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL, validateLogin, signOut } from '../../utility'
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay'
import moment from 'moment'

export class AcsMngr {
    info: any

    constructor(info: any) {
        this.info = info
    }


    // if backend allow this user to continue experiment (BE: banFlag)
    isValidUser(): true | string {
        if (this.info.banFlag) {
            return "(isValidUser) 后台禁止用户访问，原因 [" + this.info.banReason + "]。"
        }
        return true
    }

    // within the valid day range
    // user experiment progress defined as a finite state machine (the old day and setDay)
    equalDayProgress(taskDay: number): true | string {
        if (Number(this.info.day) == taskDay)
            return true
        else
            return "(equalDayProgress) 当前任务编号为" + taskDay + "，与当前用户的任务编号：[" + this.info.day + "] 不一致。"
    }

    // after eairlist start date
    // user experiment time range defined as a time range (the old time and setTime)
    afterEarlistStartDate(taskDay: number): true | string {
        const startDate = moment(this.info.startDate)
        const currentTaskDay = Math.floor(taskDay)
        // earlist start date = user_experiment_start_date + (current_task_day - 1) + 4 hours (4 am)
        // 任务开启当天的4点开始
        const earlistStartDate = startDate.clone().add(currentTaskDay - 1, 'days').add(4, 'hours')
        // if current time is after the earlist start date
        if (moment().isAfter(earlistStartDate)) {
            return true
        }
        return "(afterEarlistStartDate) 未到达任务开启时间。开启时间为" + earlistStartDate.format('YYYY-MM-DD hh:mm A') + "。"
    }

    // if local time is within the time range of the task
    isValidTimeRange(taskDay: number): true | string {
        const startDate = moment(this.info.startDate)
        const currentTaskDay = Math.floor(taskDay)
        // earlist start date = user_experiment_start_date + (current_task_day - 1) + 4 hours (4 am)
        // 任务开启当天的4点开始
        const earlistStartDate = startDate.clone().add(currentTaskDay - 1, 'days').add(4, 'hours')
        // latest start date = user_experiment_start_date + (current_task_day + 1) + 4 hours (9 am)
        // 任务开启第三天4点结束
        const latestStartDate = startDate.clone().add(currentTaskDay + 1, 'days').add(4, 'hours')
        // if current time is within the time range
        if (moment().isBetween(earlistStartDate, latestStartDate)) {
            return true
        }
        return "(isValidTimeRange) 当前时间不在任务开启时间范围内。开启时间为" + earlistStartDate.format('YYYY-MM-DD hh:mm A') + "，结束时间为" + latestStartDate.format('YYYY-MM-DD hh:mm A') + "。"
    }

    // if user has view the feedback
    viewedFeedback(taskDay: number): true | string {
        switch (taskDay) {
            case 8:
                if (this.info.feedbackDay6Viewed)
                    return true
                else
                    return "(viewedFeedback) 请先查看第6天的反馈。"
            case 10:
                if (this.info.feedbackDay8Viewed)
                    return true
                else
                    return "(viewedFeedback) 请先查看第8天的反馈。"
            case 12:
                if (this.info.feedbackDay10Viewed)
                    return true
                else
                    return "(viewedFeedback) 请先查看第10天的反馈。"
            case 14:
                if (this.info.feedbackDay12Viewed)
                    return true
                else
                    return "(viewedFeedback) 请先查看第12天的反馈。"
            case 29:
                if (this.info.feedbackDay14Viewed)
                    return true
                else
                    return "(viewedFeedback) 请先查看第14天的反馈。"
            default:
                console.error("viewedFeedback: taskDay is not in the list")
                return "(viewedFeedback) 这是一个程序错误。请通知管理员联系开发者。"

        }
    }


    // if user has feedback, they should not be able to access the task
    hasFeedback(taskDay: number): true | string {
        switch (taskDay) {
            case 7:
                if (this.info.feedbackDay6 !== "")
                    return true
                else
                    return "(hasFeedback) 管理员还未为您提供第6天的反馈。"
            case 9:
                if (this.info.feedbackDay8 !== "")
                    return true
                else
                    return "(hasFeedback) 管理员还未为您提供第8天的反馈。"
            case 11:
                if (this.info.feedbackDay10 !== "")
                    return true
                else
                    return "(hasFeedback) 管理员还未为您提供第10天的反馈。"
            case 13:
                if (this.info.feedbackDay12 !== "")
                    return true
                else
                    return "(hasFeedback) 管理员还未为您提供第12天的反馈。"
            case 15:
                if (this.info.feedbackDay14 !== "")
                    return true
                else
                    return "(hasFeedback) 管理员还未为您提供第14天的反馈。"
            default:
                console.error("hasFeedback: taskDay is not in the list")
                return "(hasFeedback) 这是一个程序错误。请通知管理员联系开发者。"
        }
    }

    laterOrEqualToDayProgress(taskDay: number): true | string {
        if (Number(this.info.day) >= taskDay)
            return true
        else
            return "(laterOrEqualToDayProgress) 当前任务编号为" + taskDay + "，大于当前用户的任务编号：[" + this.info.day + "] 。"
    }


    // check access with given task day and requirements
    checkAccess(taskDay: number, rule: Rule): true | string[] {
        const reasons: string[] = []
        const check = (result: true | string) => {
            if (result !== true) {
                reasons.push(result)
            }
        }
        if (rule === Rule.basic || rule === Rule.viewFbFirst) {
            check(this.isValidUser())
            check(this.equalDayProgress(taskDay))
            check(this.isValidTimeRange(taskDay))
        }
        switch (rule) {
            case Rule.feedback:
                check(this.hasFeedback(taskDay))
                break
            case Rule.viewFbFirst:
                check(this.viewedFeedback(taskDay))
                break
            case Rule.video:
                check(this.isValidUser())
                check(this.afterEarlistStartDate(taskDay))
                check(this.laterOrEqualToDayProgress(taskDay))
                break
            case Rule.global:
                check(this.isValidUser())
                break
            case Rule.timewindow:
                check(this.isValidUser())
                check(this.isValidTimeRange(taskDay))
        }
        if (reasons.length === 0)
            return true
        else
            return reasons
    }

}


export enum Rule {
    'basic', // isValidUser, equalDayProgress, isValidTimeRange
    'feedback', // hasFeedback
    'viewFbFirst', // basic, viewedFeedback
    'video', // isValidUser, afterEarlistStartDate
    'global', // isValidUser -> this is for global display
    'timewindow' // isValidUser, isValidTimeRange
}

export const tasks_expgroup = [
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
        rule: Rule.basic
    },
    {
        day: 3,
        questionType: '自由写作',
        timeToFinish: 30,
        taskURL: '/writing3',
        rule: Rule.basic
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
        taskURL: '/game1',
        rule: Rule.basic
    },
    {
        day: 5,
        questionType: '游戏',
        timeToFinish: 30,
        taskURL: '/game2',
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
        rule: Rule.viewFbFirst
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
        rule: Rule.viewFbFirst
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
        rule: Rule.viewFbFirst
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
        rule: Rule.viewFbFirst
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
        taskURL: '/day29ct',
        rule: Rule.timewindow
    },
    {
        day: 45,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day45',
        rule: Rule.timewindow
    },
    {
        day: 105,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day105',
        rule: Rule.timewindow
    }
]

export const tasks_controlgroup = [
    {
        day: 1,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day1',
        rule: Rule.basic
    },
    {
        day: 29,
        questionType: '问卷调查',
        timeToFinish: 25,
        taskURL: '/day29wl',
        rule: Rule.basic
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
    },
    {

        day: 107,
        questionType: '自由写作*',
        timeToFinish: 30,
        taskURL: '/writing1',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '自由写作*',
        timeToFinish: 30,
        taskURL: '/writing2',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '自由写作*',
        timeToFinish: 30,
        taskURL: '/writing3',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '科普视频*',
        timeToFinish: 10,
        taskURL: '/video4',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '游戏*',
        timeToFinish: 30,
        taskURL: '/game1',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '游戏*',
        timeToFinish: 30,
        taskURL: '/game2',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '挑战型写作*',
        timeToFinish: 30,
        taskURL: '/writing6',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '阅读反馈*',
        timeToFinish: 10,
        taskURL: '/feedback6',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '挑战型写作*',
        timeToFinish: 30,
        taskURL: '/writing8',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '阅读反馈*',
        timeToFinish: 10,
        taskURL: '/feedback8',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '挑战型写作*',
        timeToFinish: 30,
        taskURL: '/writing10',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '阅读反馈*',
        timeToFinish: 10,
        taskURL: '/feedback10',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '信件写作*',
        timeToFinish: 30,
        taskURL: '/writing12',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '阅读反馈*',
        timeToFinish: 10,
        taskURL: '/feedback12',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '信件写作*',
        timeToFinish: 30,
        taskURL: '/writing14',
        rule: Rule.video
    },
    {
        day: 107,
        questionType: '阅读反馈*',
        timeToFinish: 10,
        taskURL: '/feedback14',
        rule: Rule.video
    },
]

export function Home() {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState({
        day: NaN,
        score: NaN,
        startDate: moment().format('YYYY-MM-DD'),
        banFlag: false,
        banReason: "",
        expGroup: "",

        feedbackDay6: "",
        feedbackDay6Viewed: false,

        feedbackDay8: "",
        feedbackDay8Viewed: false,

        feedbackDay10: "",
        feedbackDay10Viewed: false,

        feedbackDay12: "",
        feedbackDay12Viewed: false,

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

    const acsMngr = new AcsMngr(info)
    const globalAccess = acsMngr.checkAccess(0, Rule.global)

    const Main = () => {
        return <div className={style.container}>
            <div className={style.rightPanel}>
                <div className={style.rightContainer}>
                    <div className={style.topTitle}>欢迎回来，用户 {getEncryptedUsernameFromCookie()}</div>
                    {globalAccess === true ? <></> :

                        <div className={style.errorContainer}>
                            <p>您暂时无法参与后续研究，系统检测到原因如下</p>
                            {globalAccess.map((reason, index) => {
                                return <div className={style.errorCard} key={index}>{reason}</div>
                            })}
                            <p>您所支付的9.9元参与费将于24小时内返回您的账户。再次感谢您的支持！</p>
                        </div>


                    }
                    <div className={style.topContainer}>
                        <div className={style.topCard}>
                            <div>今天，是您坚持参与本次训练营的第{
                                moment().diff(moment(info.startDate), 'days') + 1
                            }天</div>
                        </div>
                        <div className={style.topCard}>
                            {(info.expGroup === 'Exp1' || info.expGroup === 'Exp2') ? <>
                                <p>无论您是否完成研究，先前收取的费用（9.9元人民币）都将在第105天最后一次随访评估后三天内返还给您。

                                </p><p>
                                    您还可以在完成15天的任务、第29天、第45天与第105天的评估后分别额外获得京东E卡，所获京东卡的金额将由研究完成进度和质量共同决定。奖励金额将逐次累积，在第105天最后一次随访评估后三天内统一发放给您。</p>
                            </> :
                                info.expGroup === 'Waitlist' ? <>
                                    <p>无论您是否完成研究，先前收取的费用（9.9元人民币）都将在第105天最后一次随访评估后三天内返还给您。
                                    </p>
                                    <p>在填写完第1天、第29天、第45天和第105天的问卷并且通过了质量检测之后，您将分别获得价值10、30、60、100元人民币的京东E卡（电子礼品卡）作为报酬。但只有您同时完成第1天的问卷和随后三次中的一次后续测评才可以领取奖励。奖励金额将逐次累积，在第105天最后一份评估后三天内统一通过站内信发放给您。</p>
                                </> : <><p>您暂未被分配实验分组，请联系管理员。</p></>}
                        </div>
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
                        <Overlay target={refreshRef} show={refreshPop} placement="right">
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
                    <span style={{ fontSize: '0.8em', marginTop: '4px' }}>当天任务将于早上 4:00 am 开启</span>
                    <div className={style.bottomContainer}>
                        {
                            (info.expGroup === 'Exp1' || info.expGroup === 'Exp2')
                                ?
                                tasks_expgroup.map(task => <Task
                                key={task.day}
                                currentDay={info.day}
                                days={task.day}
                                questionType={task.questionType}
                                timeToFinish={task.timeToFinish}
                                taskURL={task.taskURL}
                                    isOpen={acsMngr.checkAccess(task.day, task.rule)} />
                            )
                                :
                                info.expGroup === 'Waitlist' ? <>
                                    <p style={{ fontSize: '0.8em ' }}>注：标*的为可选任务</p>
                                    {tasks_controlgroup.map(task => <Task
                                        key={task.day}
                                        currentDay={info.day}
                                        days={task.day}
                                        questionType={task.questionType}
                                        timeToFinish={task.timeToFinish}
                                        taskURL={task.taskURL}
                                        isOpen={acsMngr.checkAccess(task.day, task.rule)} />
                                    )}
                                </>
                                    :
                                    <p>实验组分类{info.expGroup}没有对应的任务列表，请联系管理员</p>
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



import React, { useEffect, useState } from 'react'
import styles from './Layout.module.scss'
import Modal from 'react-bootstrap/Modal'
import Markdown from 'markdown-to-jsx'
import { 实验组常见疑问, 等待组常见疑问 } from './常见疑问'
import { getTokenFromCookie } from '../../utility'
import moment from 'moment'
import { URL } from '../../utility'


export function Header() {
    const [projShow, setProjShow] = useState(false)
    const [FAQShow, setFAQShow] = useState(false)
    const [contactShow, setContactShow] = useState(false)
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

    useEffect(() => {
        elicitUserState()
    }, [])



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

    const goWelcome = () => {
        window.location.href = '/welcome'
    }
    const aboutProject = () => {
        setProjShow(true)
    }

    const FAQ = () => {
        setFAQShow(true)
    }

    const contact = () => {
        setContactShow(true)
    }

    return <header className={styles.header}>
        <div className={styles.headerInner}>
            <div className={styles.button} onClick={goWelcome}>
                回到主页
            </div>
            <div className={styles.button} onClick={aboutProject}>
                项目简介
            </div>
            <img src="/rainbow.png" alt="上海纽约大学压力与健康研究" className={styles.image} />
            <div className={styles.button} onClick={FAQ}>
                常见疑问
            </div>
            <div className={styles.button} onClick={contact}>
                联系我们
            </div>
        </div>
        <Modal size="lg" show={projShow} onHide={() => setProjShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px' }}>项目简介</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '16px' }}>
                    <Markdown>
                        {`
本研究将在三个半月内耗费您大约九个小时的时间。在第0天、第29天、第45天和第105天，你将完成一份问卷，该问卷大约需要20分钟完成。你还可能被邀请参加一个为期15天的项目，在这个项目中，你将观看一些基于文本的对话，了解其他性少数群体男性所面临的挑战和他们的想法，并做一些写作练习。这个15天的项目每天大概会占用您30分钟的时间。除此之外我们将不会占用您的其它时间。在研究的不同阶段，您将获得不同价值的京东电子购物券，总计10–200元，具体金额取决于您所完成任务的质量与数量。

** 研究负责人：**
* 李谷，博士，上海纽约大学心理学助理教授，纽约大学全球网络助理教授
* Pekka Santtila，博士，持证心理学家及法律心理学专家，上海纽约大学心理学教授，纽约大学全球网络教授
* Thomas Nyman，博士，持证临床心理学家，上海纽约大学心理学实践助理教授

** 研究开发主要贡献者：**
* Sherry Bai
* Shawn Yang
* Guangju Wen
* Alice Gao
* Jiaxuan Li

** 网站开发人员：** 
* Zifeng An 安子峰
* Harry Lee

** 研究心理服务提供者：** 
* 黄思嘉 Leslie，就读于哥伦比亚大学心理咨询硕士项目
* 木一，就读于华东师范大学-上海纽约大学应用心理学临床和咨询联合硕士项目
* Wenjia Wang，就读于就读于加州职业心理学院心理学博士项目

** 研究主要工作人员：** 
* 倪子凌 Shirly，项目经理
* 程欣宜 Kelly，项目助理经理
* 白琪杉
* 陈欣玮
* 房晏清
* 季杨子彦
* 李珞冉
* 刘纯汐
* 袁艺菡
* 张思琪

                        `}
                    </Markdown>
                </p>
            </Modal.Body>
        </Modal>
        <Modal size="lg" show={FAQShow} onHide={() => setFAQShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px' }}>常见疑问</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Markdown className={styles.markdown}>
                    {
                        !info.expGroup ? '未分配实验组' :
                            info.expGroup === 'Waitlist' ? 等待组常见疑问 : 实验组常见疑问
                    }
                </Markdown>
            </Modal.Body>
        </Modal>
        <Modal size="lg" show={contactShow} onHide={() => setContactShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px' }}>联系我们</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '16px' }}>
                    如您有任何疑问，欢迎通过邮箱联系我们：<a href='mailto:shanghai.nyuhealthstudy@nyu.edu'>shanghai.nyuhealthstudy@nyu.edu</a>
                </p>
            </Modal.Body>
        </Modal>
    </header>

}

export default Header

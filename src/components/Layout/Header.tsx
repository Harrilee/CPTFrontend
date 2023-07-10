import React, { useState } from 'react'
import styles from './Layout.module.scss'
import Modal from 'react-bootstrap/Modal'

export function Header () {
    const [projShow, setProjShow] = useState(false)
    const [FAQShow, setFAQShow] = useState(false)
    const goWelcome = () => {
        window.location.href = '/welcome'
    }
    const aboutProject = () => {
        setProjShow(true)
    }

    const FAQ = () => {
        setFAQShow(true)
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
                <div className={styles.button} onClick={goWelcome}>
                    联系我们
                </div>
            </div>
            <Modal size="lg" show={projShow} onHide={() => setProjShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '20px' }}>项目简介</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: '16px' }}>
                        本研究将在三个半月内耗费您大约九个小时的时间。在第0天、第29天、第45天和第105天，你将完成一份问卷，该问卷大约需要20分钟完成。你还可能被邀请参加一个为期15天的项目，在这个项目中，你将观看一些基于文本的对话，了解其他性少数群体男性所面临的挑战和他们的想法，并做一些写作练习。这个15天的项目每天大概会占用您30分钟的时间。除此之外我们将不会占用您的其它时间。
                        <b>在研究的不同阶段，您将获得不同价值的京东电子购物券，总计20–200元</b>
                        ，具体金额取决于您所完成任务的质量与数量。
                    </p>
                </Modal.Body>
            </Modal>
            <Modal size="lg" show={FAQShow} onHide={() => setFAQShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '20px' }}>常见疑问</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: '16px' }}>
                        <b>Q1： 培训持续多少天？/培训有哪些环节？（仅实验组）</b>
                        <br />
                        A:
                        培训的活动一共有15天，本期培训是从xx月xx日到xx月xx日，15天内每日会有任务需要您完成。培训结束后我们会有三次的后期问卷小调查，会在问卷发放的前一天给您短信提示，您完成调查会有不同金额的礼品卡奖励哦。
                        <br />
                        <br />
                        <b>Q2：完成培训/后续调查有什么补偿？/奖励是什么？</b>
                        <br />
                        A：（先在参与者名单（link）内确认该参与者是实验组还是等待组成员）
                        <br />
                        （如是实验组）完成15天培训和三次后续调查每一次都可以获得京东购物卡奖励，卡面的金额每次递增，最后累计发放给您。完成15天培训1可以获得价值10元的京东购物卡，完成第一次调查则可以获得30元，两项累计40元；完成第二次获得60元，三项累计100元；完成第三次调查获得100元，四项累计200元。所以如果您每一次培训和调查都完成就可以一共获得200元的京东购物卡报酬！要提醒您只有完成了全部15天培训才可以领取报酬并参与之后的调查哦。
                        （如是等待组）您在研究第一天完成第一份问卷可以获得价值10元的京东购物卡的基础报酬，您只要在之后完成三次调查的其中一次就可以领取报酬啦！三次的后续调查每完成一次也会有额外的奖励金额：完成第一次调查则可以获得30元，累计获得40元；完成第二次获得60元，累计获得100元；完成第三次调查获得100元，累计获得200元。所以只要您完成后面的三次调查就一共可以获得总计200元的京东购物卡奖励！在研究结束之后您还可以获得一次免费参与心理干预项目的机会！
                        <br />
                        <br />
                        <b>Q3：我如果参与到一半中途有事可以退出吗？</b>
                        <br />
                        A：（先在参与者名单（link）内确认该参与者是实验组还是等待组成员）
                        （如是实验组）我们还是推荐您跟随正常流程全程参与，这是您获取报酬的重要前提条件哦。考虑到您中途可能有忙碌或者忘记的情况，我们在15天培训中也采取了可以延迟完成任务的机制，如果您错过了一天的任务，您可以在第二天将前一天的任务补上并同时完成当天的任务，您不会错过任何流程和奖励！我们届时也会每日短信提示您。但是如果您连续错过两天的任务就无法再补上了，会被视为中途退出培训，将无法领取到报酬且不会被邀请到之后的后续调查中哦。我们会在最后一次调查结束后的三天之内将9.9的参与保证金退还给您，不会收取任何的费用。如果您错过了后续的调查我们则会根据您完成的调查总次数和对应的奖励来发放报酬数额。
                        （如是等待组）我们还是推荐您跟随正常流程全程参与，这是您获取报酬的重要前提条件哦。提醒您您需要起码完成三次后续调查中的一次才可以领取基础报酬和对应的后续调查金额奖励哦。当然如果您中途想要退出研究，我们也会在最后一次调查结束后的三天之内将9.9的参与保证金退还给您，不会收取任何的费用。
                        <br />
                        <br />
                        <b>Q4：参与研究要收9.9的参与费吗？/9.9的费用会退吗？</b>
                        <br />
                        A：9.9元的费用仅仅只是参与研究的押金来提高大家的参与度，我们在研究结束都会统一退回，不会收取任何费用的，而您完成研究和后续调查还可以收到相应金额的报酬。本期研究的统一退时间是最后一次调查结束的三天之内，即xx月xx日之后的三天内。我们会同时进行9.9元押金的退费并且将您获得的报酬通过网站发放给您。
                        <br />
                        <br />
                        <b>Q5：9.9元的押金怎么退给我？/报酬怎么发给我？我怎么领取报酬？</b>
                        <br />
                        A：您在提交9.9元的押金使通过我们专门开设的微信店铺提交的，在退费时我们会取消订单使您的押金原路退回到您的账户；报酬的获取方式我们将通过网上上传更新给您，您可以在网站上看到获得的京东购物卡的数额和领取链接。在完成退费和报酬发放之后我们也会给您发送短信通知您。
                        <br />
                        <br />
                        <b>Q6：可以直接把报酬/购物卡发到我的账户上吗？/我不想登录网站，可以直接用短信发给我吗？</b>
                        <br />
                        A：很抱歉，因为涉及隐私问题和平台限制我们不可以直接将奖励发到您的账号上/通过短信发送给您。我们会将获取方式通过网站上传给您，然后短信通知您领取，感谢您的理解和支持哦。
                    </p>
                </Modal.Body>
            </Modal>
        </header>

}

export default Header

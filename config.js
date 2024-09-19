const config = {
  mode: "in", // 签到:in,签退:out
  accounts: [
    {
      username: "", //用户名
      password: "", //密码
      openId: "", //微信小程序抓包openid(可选)
      unionId: "", //微信小程序抓包unionId(可选)
      sign: true, //是否自动签到
      reSign: false, //是否重新签到
      location: "", //经纬度 (可选),例如 "120.210792,30.246026"、"经度,纬度",不填写则自动获取（推荐）
      // signImagePath: "./images/1.jpeg", //签到图片
      // needReport: false, //是否自动填写周报
    },
    // 添加多个账户
    // {
    //   username: "",
    //   password: "",
    //   openId: "",
    //   unionId: "",
    //   sign: true, //是否自动签到
    //   reSign: true, //是否重新签到
    //   signImagePath: "./images/1.jpeg", //签到图片
    //   needReport: false, //是否自动填写周报
    // },
  ],
  qmsgKey: "", //qmsg酱key
  qmsgTo: "", //推送的qq号,用,分隔(可选)
};

const modeCN = {
  in: "签到",
  out: "签退",
};
config.modeCN = modeCN[config.mode];

const apis = {
  login: "login/login.action",
  accountInfo: "account/LoadAccountInfo.action",
  projects: "student/progress/ProjectList.action",
  tasks: "student/progress/ProjectProgressInfo.action",
  //周报
  weekBlogStatus: "student/blog/Plan!getDefault.action",
  weekReportsDate: "student/blog/LoadBlogDate!weekYear.action",
  weekReports: "student/blog/LoadBlogDate!week.action",
  weelBlogSave: "student/blog/Blog!save.action",
  weelBlogSubmit: "student/blog/Blog!getSubmitData.action",
  //签到
  clockDefault: "student/clock/GetPlan!getDefault.action", //planId => traineeId
  clockDetail: "student/clock/GetPlan!detail.action", //traineeId => postInfo
  clock: "student/clock/Post!autoClock.action", //首次签到
  clockNew: "student/clock/PostNew.action", //重新签到或签退
  // clockUpdate: "student/clock/PostNew!updateClock.action", //更新最近的签到/签退记录，已有签退记录时无法更新之前的签到记录
  clockUpdate: "student/clock/Post!updateClock.action", // reClock
  // clockNew: "student/clock/Post!autoClock.action", //临时接口
  // clockUpdate: "student/clock/postTemporary!updateClock.action", // reClock 临时接口
  //上传
  uploadInfo: "uploadfile/commonPostPolicy.action", //oss info
  uploadFile: "https://xyb001.oss-cn-hangzhou.aliyuncs.com/",
  duration: "behavior/Duration.action",
  ip: "behavior/Duration!getIp.action",
  // 地图api
  map:"https://restapi.amap.com/v3/geocode/regeo",
};

const reports = [
  [
	"本周是我在公司实习的第一周，刚进入公司的时候对嵌入式开发的流程不是很熟悉。我的主管安排了一位同事带我熟悉开发环境和工具，包括版本控制系统的使用（Git）以及项目的构建工具（Makefile）等。最初的几天主要是培训和阅读相关文档，了解公司目前的项目和使用的技术栈。
	
	在实习的过程中，我逐渐理解了如何处理简单的嵌入式任务，例如如何调试简单的C语言程序，如何利用开发板进行固件的烧录和验证。还学习了如何使用硬件调试工具（JTAG）来进行实时调试，尤其是解决代码中的死循环和中断处理问题。本周的重点是熟悉开发流程和项目代码。
	
	通过这段时间的学习，我对嵌入式开发有了初步的认识，也开始逐渐适应公司的工作节奏。下周，我将继续深入了解项目结构，并参与一些小型功能的开发。",
  ],// 第一周
  [
    "这一周我主要负责阅读和修改项目中的部分代码，尤其是处理与硬件相关的底层驱动。主管给我安排了一个简单的任务：优化系统中的中断处理代码。为了更好地完成这个任务，我重新学习了C语言中的指针和内存管理，并通过阅读公司之前的项目代码，了解了如何高效处理中断。
	
	此外，我还参与了一个关于CAN总线协议的学习研讨会，了解到CAN总线在嵌入式系统中的应用，并学习了如何编写与CAN通信相关的代码。为了加深理解，我在开发板上实现了简单的CAN消息收发功能，并在测试时发现了一些之前未考虑到的边缘情况，最后在同事的帮助下解决了问题。本周的收获非常大，不仅让我更深入地理解了中断和通信协议的相关知识，还让我逐渐掌握了如何在团队中高效合作，提升了代码的规范性和可读性。",
  ],// 第二周
  [
    "本周我参与了一个涉及环形缓冲区的项目，主要任务是实现数据缓冲区的读写操作。这是一个典型的嵌入式系统设计中的问题，通过学习和实践，我理解了环形缓冲区在数据流中的重要性，尤其是在处理串口通信时的应用。    
	
	我编写了一个简单的环形缓冲区的驱动程序，并在调试过程中遇到了一些缓冲区溢出和数据丢失的问题。通过查阅文档和请教同事，我成功修复了这些问题，并优化了代码性能。此外，我还学习了如何利用逻辑分析仪来调试串口通信，这对调试环形缓冲区的工作有很大帮助。    
	
	本周的实习让我对数据流处理有了更深入的理解，并开始具备独立解决问题的能力。接下来，我将尝试参与更多涉及底层驱动开发的工作，进一步提升我的开发能力。",
  ],// 第三周
  [
    "本周我对公司的业务流程和技术框架有了更深入的了解，尤其是在嵌入式系统的开发流程方面，收获颇多。我继续学习和熟悉公司使用的嵌入式C语言的代码库，并参与了一个小型的调试任务，尽管遇到了一些困难，但在团队的帮助下逐步解决。这个过程中，我深刻认识到调试对于嵌入式开发的重要性。

	此外，我还开始接触到一些项目管理工具，学习如何更高效地安排自己的工作时间，提高工作效率。",
  ],// 第四周
  [
    "本周我主要参与了一个新的嵌入式项目，重点是与硬件相关的调试工作。通过与硬件团队的紧密合作，我加深了对硬件接口和驱动开发的理解。特别是在调试环节，我学会了如何使用逻辑分析仪和示波器等工具，排查硬件通信问题。

	除了技术工作，我还参加了几次技术讨论会，了解了团队其他成员的工作进展，学习了他们的经验和思路。这让我对嵌入式开发的全局有了更清晰的认识。",
  ],// 五
  [
    "本周我继续深入参与嵌入式开发项目，负责的模块涉及传感器数据的采集与处理。项目要求我编写高效的代码来处理实时数据，因此我学习了与优化相关的技巧，比如内存管理和中断处理。
	
	在项目中遇到的挑战是如何处理实时数据流的突发情况，通过查阅资料和与同事交流，我逐步掌握了如何在嵌入式系统中应对这些复杂情况。",
  ],// 6
  [
    "本周的工作重心转向了系统性能的调优。在嵌入式系统中，性能优化是个至关重要的部分，因此我花费了大量时间分析代码中的性能瓶颈，并学习如何在有限的硬件资源上优化执行效率。通过这段时间的学习，我对内存分配、CPU调度以及系统中断的管理有了更多理解。

	我还与团队中的资深工程师一起，进行了代码复查，发现了许多可以改进的地方，学习到很多最佳实践。",
  ],// 7
  [
    "本周我参与了项目的集成测试工作，负责确保不同模块之间的兼容性。在集成测试过程中，我遇到了不少问题，尤其是一些模块之间的通信协议出现了偏差。为了解决这些问题，我与开发团队进行了密切的沟通，并通过调试工具找到了问题根源。

	通过这个过程，我学到了如何系统性地分析和解决复杂问题，同时对不同模块的工作原理有了更深入的理解。",
  ],// 8
  [
    "本周我主要聚焦在系统的稳定性测试上，负责评估系统在长时间运行后的性能表现。在测试过程中，我发现了一些潜在的内存泄漏问题。经过分析和与团队讨论，我编写了相关的内存管理代码，提升了系统的稳定性。

	同时，我也学习了如何通过自动化工具进行批量测试，以提高测试效率。这些新技能让我在未来的工作中可以更加高效地处理类似任务。",
  ],// 9
  [
    "本周我开始参与一个全新的嵌入式项目，涉及到通信协议的开发和实现。这对我来说是一个全新的挑战，需要学习和掌握相关的协议标准和实现方法。在团队的支持下，我逐步熟悉了项目的技术背景，并开始编写相应的协议栈代码。

	同时，我也更加关注代码的可读性和可维护性，遵循公司规定的代码规范，确保代码质量。",
  ],// 10
  [
    "本周我继续负责通信协议的开发工作。随着项目的深入，我对协议实现中的一些细节有了更深刻的理解，尤其是在数据传输的稳定性和安全性方面。通过查阅大量技术文档和资料，我对如何实现高效的传输机制有了新的认识，并应用到实际的代码编写中。

	在团队合作方面，我与其他成员紧密配合，确保我们的模块能够顺利集成，进展顺利。",
  ],// 11
  [
    "本周的工作重点是优化通信协议的实现。经过上周的开发，我发现代码中存在一些性能瓶颈，尤其是在数据传输速度上有较大的提升空间。经过与团队讨论和分析，我们对部分代码进行了重构，并在传输机制上进行了优化，最终显著提高了系统的响应速度。

	此外，我还参与了代码评审环节，学习到了很多优秀的编程技巧。",
  ],// 12
  [
    "本周我主要参与了系统的稳定性测试，尤其是针对极端环境下的测试。通过模拟极端温度和电压波动的情况，我们发现了一些潜在的问题。为了解决这些问题，我与硬件团队紧密合作，进行了详细的分析和调整，确保系统能够在不同环境下稳定运行。

	同时，我也通过这些测试，学习到了如何更好地优化代码，以应对不同硬件平台的性能差异。",
  ],// 13
  [
    "本周我负责了项目的部分文档编写工作。通过整理项目中的技术细节和开发流程，我进一步加深了对项目的理解。在编写文档的过程中，我学会了如何将复杂的技术概念用简洁明了的方式表达出来，这对以后的工作将大有裨益。

	同时，我继续参与项目的开发工作，负责部分代码的优化和调试。",
  ],// 14
  [
    "本周我继续深入参与项目的开发，负责的模块是系统中的关键部分之一。在开发过程中，我遇到了一些复杂的问题，尤其是在实时数据处理方面需要进行进一步优化。通过与团队讨论，我找到了更好的解决方案，并在代码中成功应用。

	我还学习到了更多关于嵌入式系统设计的最佳实践，并将其应用到我的工作中。",
  ],// 15
  [
    "本周我开始参与项目的后期集成工作，主要负责将不同模块整合在一起进行测试。集成过程中遇到了一些兼容性问题，尤其是在不同模块的数据通信方面。为了解决这些问题，我与团队进行了深入讨论，并通过调试工具找到了问题的根源，最终顺利完成了集成工作。

	此外，我还参与了项目的代码审查工作，从中学到了很多优秀的编程经验。",
  ],// 16
  [
    "本周我继续参与系统的集成测试，主要负责系统的稳定性和性能测试。经过测试，发现了部分代码在高负载情况下存在性能瓶颈。为了解决这个问题，我对代码进行了优化，并使用了多线程技术提升了系统的处理能力。

	与此同时，我还参与了团队的技术分享会议，学习到了其他项目中的一些经验和技巧。",
  ],// 17
  [
    "本周我继续进行系统的性能优化工作，尤其是在内存管理和任务调度方面进行了深入研究。通过优化代码结构和减少不必要的内存分配，我显著提高了系统的运行效率。

	此外，我还开始着手准备项目的最终交付文档，确保项目的每个环节都有详细的记录和说明。",
  ],// 18
  [
    "本周我参与了项目的最后阶段，主要负责系统的最终测试和文档整理工作。在测试过程中，我确保所有模块都能够无缝协作，且系统在长时间运行后依然保持稳定。同时，我还负责了用户手册的编写工作，确保用户能够顺利操作和使用我们的系统。

	整个项目即将接近尾声，我感受到了从开发到测试再到文档编写的整个流程的重要性。",
  ],// 19
  [
    "本周是我在公司实习的第20周，经过这些时间的锻炼，我已经能够独立承担更多任务，并参与到项目的核心开发中。本周的主要工作是调试和优化嵌入式C代码，并与硬件团队紧密合作，解决系统运行中的一些不稳定问题。

	同时，我积极参与团队的技术讨论，提出了自己的见解和建议，得到了团队的认可和反馈。通过这些实践，我对嵌入式开发的理解更加深入，也更加明确了未来发展的方向。",
  ],// 20
];

module.exports = { config, apis, reports };

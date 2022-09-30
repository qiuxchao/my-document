# JavaScript 的历史

随着Web日益流行，对客户端脚本语言的需求也越来越强烈。当时，大多数用户使用28.8kbit/s的调制解调器上网，但网页变得越来越大、越来越复杂。为验证简单的表单而需要大量与服务器的往返通信成为用户的痛点。想象一下，你填写完表单，单击“提交”按钮，等30秒处理，然后看到一条消息，告诉你有一个必填字段没填。网景在当时是引领技术革新的公司，它将开发一个客户端脚本语言来处理这种简单的数据验证提上了日程。

1995年，网景公司一位名叫Brendan Eich的工程师，开始为即将发布的Netscape Navigator 2开发一个叫Mocha（后来改名为LiveScript）的脚本语言。当时的计划是在客户端和服务器端都使用它，它在服务器端叫LiveWire。

为了赶上发布时间，网景与Sun公司结为开发联盟，共同完成LiveScript的开发。就在Netscape Navigator 2正式发布前，网景把LiveScript改名为JavaScript，以便搭上媒体当时热烈炒作Java的顺风车。

由于JavaScript 1.0很成功，网景又在Netscape Navigator 3中发布了1.1版本。尚未成熟的Web的受欢迎程度达到了历史新高，而网景则稳居市场领导者的位置。这时候，微软决定向IE投入更多资源。就在Netscape Navigator 3发布后不久，微软发布了IE3，其中包含自己名为JScript（叫这个名字是为了避免与网景发生许可纠纷）的JavaScript实现。1996年8月，微软重磅进入Web浏览器领域，这是网景永远的痛，但它代表JavaScript作为一门语言向前迈进了一大步。

微软的JavaScript实现意味着出现了两个版本的JavaScript:Netscape Navigator中的JavaScript，以及IE中的JScript。与C语言以及很多其他编程语言不同，JavaScript还没有规范其语法或特性的标准，两个版本并存让这个问题更加突出了。随着业界担忧日甚，JavaScript终于踏上了标准化的征程。

1997年，JavaScript 1.1作为提案被提交给欧洲计算机制造商协会（Ecma）。第39技术委员会（TC39）承担了“标准化一门通用、跨平台、厂商中立的脚本语言的语法和语义”的任务（参见TC39-ECMAScript）。TC39委员会由来自网景、Sun、微软、Borland、Nombas和其他对这门脚本语言有兴趣的公司的工程师组成。他们花了数月时间打造出ECMA-262，也就是ECMAScript（发音为“ek-ma-script”）这个新的脚本语言标准。

1998年，国际标准化组织（ISO）和国际电工委员会（IEC）也将ECMAScript采纳为标准（ISO/IEC-16262）。自此以后，各家浏览器均以ECMAScript作为自己JavaScript实现的依据，虽然具体实现各有不同。


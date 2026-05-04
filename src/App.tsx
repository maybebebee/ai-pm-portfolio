type AbilityGroup = {
  title: string;
  items: string[];
};

type Project = {
  name: string;
  description: string;
  role: string;
  tags: string[];
};

const abilityGroups: AbilityGroup[] = [
  {
    title: '产品能力',
    items: ['需求分析', '用户场景拆解', 'PRD 撰写', '原型设计', '竞品分析', '产品方案汇报'],
  },
  {
    title: 'AI 产品能力',
    items: ['Prompt 设计', 'RAG 产品理解', 'Agent 流程设计', '知识库问答', 'AI 工作流设计'],
  },
  {
    title: '技术理解',
    items: ['React', 'TypeScript', 'Python', 'SQL', 'API 联调', 'Vibe-Coding'],
  },
  {
    title: '实践经历',
    items: ['竞赛项目', 'AI Demo 搭建', '教育产品实践', '行业交流与持续学习'],
  },
];

const projects: Project[] = [
  {
    name: 'AI 知识库答疑系统 Demo',
    description: '基于 RAG 架构设计的文档问答系统，支持知识库检索、答案生成与引用溯源。',
    role: '产品设计 / Demo 搭建 / 流程设计',
    tags: ['RAG', '知识库问答', 'Prompt', 'AI 产品设计', 'Vibe-Coding'],
  },
  {
    name: '伯乐一号，智能招聘评估系统',
    description: '面向企业招聘场景的 AI 人才评价系统，通过多模态分析与多 Agent 决策辅助 HR 提升筛选效率。',
    role: '产品负责人 / 需求分析 / 商业计划 / 产品方案设计',
    tags: ['AI 招聘', '多模态分析', 'Agent', 'ToB 产品', '商业模式'],
  },
  {
    name: '学科陪跑与 AI 诊断产品',
    description: '面向高中学生与家长的学情诊断和陪跑规划产品，围绕学生画像、学科诊断和执行规划形成服务闭环。',
    role: '产品策划 / 用户洞察 / 服务流程设计 / 内容运营',
    tags: ['教育产品', '用户画像', '诊断报告', '增长运营', '服务设计'],
  },
];

const methodology = [
  '项目背景',
  '用户痛点',
  '目标用户',
  '产品目标',
  '核心流程',
  '功能结构',
  '原型 / Demo 截图',
  '技术方案理解',
  '产品指标',
  '项目复盘',
];

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <a href="#top" className="text-base font-bold text-slate-950">
          范与恒
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <a className="transition hover:text-teal-700" href="#about">
            关于我
          </a>
          <a className="transition hover:text-teal-700" href="#projects">
            作品集
          </a>
          <a className="transition hover:text-teal-700" href="#resume">
            简历
          </a>
          <a className="transition hover:text-teal-700" href="#contact">
            联系方式
          </a>
        </nav>
      </header>

      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pb-24">
        <div>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            AI 产品经理方向 · 大模型应用产品
          </div>
          <h1 className="mt-7 text-4xl font-bold leading-tight text-slate-950 sm:text-6xl">
            范与恒
          </h1>
          <p className="mt-4 text-xl font-semibold text-teal-800 sm:text-2xl">AI 产品经理方向</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            具备软件工程背景与 AI 产品实践意识，关注大模型应用、RAG、Agent 与 AI 工作流，能够结合产品设计、技术理解与 Vibe-Coding 推进可落地的 AI Demo。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-teal-800"
            >
              查看作品集
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-800"
            >
              简历可按需提供
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-soft backdrop-blur">
          <div className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-5">
            <p className="text-sm font-semibold text-teal-700">Portfolio 2026</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">AI Product Manager</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {['RAG', 'Agent', 'Prompt', 'PRD'].map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-slate-500">学校</dt>
              <dd className="mt-1 font-semibold text-slate-900">浙江工商大学</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-slate-500">专业</dt>
              <dd className="mt-1 font-semibold text-slate-900">软件工程</dd>
            </div>
            <div className="col-span-2 rounded-xl bg-slate-50 p-4">
              <dt className="text-slate-500">当前目标</dt>
              <dd className="mt-1 font-semibold text-slate-900">AI 产品经理实习机会</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="about" className="border-y border-slate-200 bg-white/70 px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="About"
            title="围绕 AI 产品落地建立能力结构"
            description="我希望把产品判断、AI 应用理解和 Demo 搭建能力放在同一个作品集中，让项目不只停留在经历描述，而能展示问题拆解与方案推进。"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {abilityGroups.map((group) => (
              <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Projects"
            title="项目作品集"
            description="每个项目都围绕真实场景、用户问题、产品方案和 Demo 能力展开，重点展示我对 AI 产品从想法到落地的理解。"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex min-h-[22rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="text-xl font-bold leading-snug text-slate-950">{project.name}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>
                <p className="mt-5 text-sm">
                  <span className="font-semibold text-slate-950">我的角色：</span>
                  <span className="text-slate-600">{project.role}</span>
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <a
                  href="#methodology"
                  className="mt-auto inline-flex w-fit items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                >
                  查看详情
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="border-y border-slate-200 bg-slate-950 px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Methodology</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">项目详情方法论</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              后续每个项目详情页都会按照产品经理的工作链路沉淀，不只展示做过什么，也展示为什么做、怎么判断优先级、如何验证方案，以及怎样复盘下一步。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {methodology.map((item, index) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/8 p-4">
                <p className="text-xs font-semibold text-teal-300">{String(index + 1).padStart(2, '0')}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Resume</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">简历与更多材料</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              你可以下载我的简历，或通过作品集了解我的项目思考、产品设计过程和 Demo 搭建能力。
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-950 sm:w-auto"
          >
            简历可按需提供
          </a>
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">联系方式</h2>
            <p className="mt-3 text-slate-600">正在寻找 AI 产品经理实习机会</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">邮箱</p>
              <p className="mt-1 font-semibold text-slate-950">可在简历中查看</p>
            </div>
            <a className="rounded-xl border border-slate-200 p-4 transition hover:border-teal-300 hover:bg-teal-50" href="https://github.com/maybebebee">
              <p className="text-sm text-slate-500">GitHub</p>
              <p className="mt-1 break-words font-semibold text-slate-950">https://github.com/maybebebee</p>
            </a>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">微信</p>
              <p className="mt-1 font-semibold text-slate-950">可在简历中查看</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">状态</p>
              <p className="mt-1 font-semibold text-slate-950">正在寻找 AI 产品经理实习机会</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;

import { useEffect, useMemo, useState } from 'react';

type PageKey = 'dashboard' | 'jobs' | 'screening' | 'interview' | 'analysis' | 'talent';

type Candidate = {
  name: string;
  role: string;
  city: string;
  school: string;
  degree: string;
  experience: string;
  score: number;
  skill: number;
  project: number;
  career: number;
  tags: string[];
  highlights: string[];
  risks: string[];
  status: '待筛选' | '已初筛' | '建议面试' | '推荐录用';
};

type Job = {
  title: string;
  count: number;
  status: string;
};

const navItems: { key: PageKey; label: string; icon: string }[] = [
  { key: 'dashboard', label: '仪表盘', icon: '⌂' },
  { key: 'jobs', label: '岗位设置', icon: '▣' },
  { key: 'screening', label: '简历筛选', icon: '□' },
  { key: 'interview', label: '面试辅助', icon: '◌' },
  { key: 'analysis', label: '综合分析', icon: '◎' },
  { key: 'talent', label: '人才库', icon: '◇' },
];

const jobs: Job[] = [
  { title: 'AI算法工程师', count: 12, status: '招聘中' },
  { title: '机器学习-具身智能-研发工程师', count: 20, status: '招聘中' },
  { title: '机器学习-计算机视觉-研发工程师', count: 11, status: '招聘中' },
  { title: 'Python后端工程师', count: 11, status: '招聘中' },
  { title: 'Vue前端工程师', count: 10, status: '招聘中' },
];

const candidates: Candidate[] = [
  {
    name: '梁雪',
    role: 'AI算法工程师',
    city: '上海',
    school: '华东理工大学',
    degree: '硕士',
    experience: '3年',
    score: 92,
    skill: 91,
    project: 90,
    career: 92,
    tags: ['Python', 'PyTorch', 'RAG', '推荐系统', '多模态'],
    highlights: ['简历中有完整算法项目闭环', '岗位技能匹配度高', '具备业务指标意识'],
    risks: ['管理经验较少', 'ToB 招聘场景经验需要追问'],
    status: '推荐录用',
  },
  {
    name: '罗峰',
    role: '机器学习-具身智能-研发工程师',
    city: '上海',
    school: '浙江工业大学',
    degree: '本科',
    experience: '3年',
    score: 91,
    skill: 91,
    project: 90,
    career: 92,
    tags: ['ROS', '强化学习', 'OpenCV', '机器人', 'C++'],
    highlights: ['具身智能方向经历集中', '项目产出清晰', '技能栈贴合岗位'],
    risks: ['候选人稳定性需要确认', '薪资预期需提前沟通'],
    status: '建议面试',
  },
  {
    name: '张机器',
    role: '机器学习-具身智能-研发工程师',
    city: '杭州',
    school: '浙江大学',
    degree: '硕士',
    experience: '2年',
    score: 89,
    skill: 93,
    project: 92,
    career: 82,
    tags: ['机器人', 'SLAM', '深度学习', 'TensorRT'],
    highlights: ['技术深度强', '工程优化经验较好'],
    risks: ['职业动机不够明确'],
    status: '已初筛',
  },
  {
    name: '许美思',
    role: 'AI算法工程师',
    city: '北京',
    school: '北京航空航天大学',
    degree: '硕士',
    experience: '4年',
    score: 88,
    skill: 88,
    project: 87,
    career: 89,
    tags: ['NLP', 'LLM', 'Prompt', '知识库'],
    highlights: ['大模型应用经验较完整', '表达结构清楚'],
    risks: ['近期项目更偏应用层'],
    status: '已初筛',
  },
  {
    name: '唐辉',
    role: '视觉算法工程师',
    city: '深圳',
    school: '哈尔滨工业大学',
    degree: '硕士',
    experience: '5年',
    score: 85,
    skill: 89,
    project: 86,
    career: 82,
    tags: ['YOLO', '检测', 'TensorFlow', '部署'],
    highlights: ['视觉算法工程落地经验稳定'],
    risks: ['岗位方向与目标岗位有轻微偏差'],
    status: '已初筛',
  },
];

function BoleOneDemo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<PageKey>('dashboard');
  const [selectedJob, setSelectedJob] = useState(jobs[1]);
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[1]);
  const [screeningDone, setScreeningDone] = useState(false);

  const filteredCandidates = useMemo(
    () => candidates.filter((candidate) => candidate.role === selectedJob.title || selectedJob.title === 'AI算法工程师'),
    [selectedJob],
  );

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <main className="mx-auto min-h-screen max-w-[1520px] px-4 py-4">
        <Topbar title={navItems.find((item) => item.key === activePage)?.label ?? '仪表盘'} />
        <div className="mt-4 grid gap-4 lg:grid-cols-[220px_1fr]">
          <Sidebar activePage={activePage} onChange={setActivePage} />
          <section className="min-w-0 rounded-[28px] border border-white bg-white/70 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            {activePage === 'dashboard' && (
              <Dashboard
                onNavigate={setActivePage}
                onPickJob={(job) => {
                  setSelectedJob(job);
                  setActivePage('screening');
                }}
              />
            )}
            {activePage === 'jobs' && (
              <JobsPage selectedJob={selectedJob} onSelectJob={setSelectedJob} onRunScreening={() => setActivePage('screening')} />
            )}
            {activePage === 'screening' && (
              <ScreeningPage
                candidates={filteredCandidates}
                selectedJob={selectedJob}
                selectedCandidate={selectedCandidate}
                screeningDone={screeningDone}
                onRunScreening={() => setScreeningDone(true)}
                onSelectCandidate={setSelectedCandidate}
                onInterview={() => setActivePage('interview')}
                onAnalysis={() => setActivePage('analysis')}
              />
            )}
            {activePage === 'interview' && <InterviewPage candidate={selectedCandidate} onFinish={() => setActivePage('analysis')} />}
            {activePage === 'analysis' && <AnalysisPage candidate={selectedCandidate} selectedJob={selectedJob} onTalent={() => setActivePage('talent')} />}
            {activePage === 'talent' && <TalentPage candidates={candidates} />}
          </section>
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-5 py-6 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)] lg:grid lg:grid-cols-[1fr_420px]">
        <section className="relative overflow-hidden bg-[#eef4ff] p-8 sm:p-12">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-400 via-sky-400 to-violet-400" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">B1</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Bole One MVP</p>
                <h1 className="text-xl font-black">伯乐一号 · 招聘决策台</h1>
              </div>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-teal-600 shadow-sm">AI Hiring OS</span>
          </div>

          <div className="mt-16 max-w-3xl">
            <p className="text-sm font-bold text-teal-600">从“筛简历”升级为“做招聘决策”</p>
            <h2 className="mt-4 text-5xl font-black leading-tight tracking-tight sm:text-7xl">
              用一个闭环
              <span className="block text-slate-500">跑通招聘判断</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              面向 HR 与业务面试官的 AI 招聘 MVP：把岗位标准、简历信息、面试记录和综合推荐放进同一条可追踪的数据链路。
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {[
              ['01', '定义岗位', '沉淀可执行筛选标准'],
              ['02', '初筛排序', '给出候选人优先级'],
              ['03', '面试追问', '辅助面试官验证风险'],
              ['04', '推荐入库', '形成可复用人才资产'],
            ].map(([step, title, desc]) => (
              <div key={step} className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-teal-600">{step}</p>
                <p className="mt-5 font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] bg-slate-950 p-6 text-white">
            <div className="grid gap-6 sm:grid-cols-4">
              {[
                ['91', '候选人样本'],
                ['12', '岗位简历池'],
                ['4', 'AI 分析节点'],
                ['1', '最终推荐闭环'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-4xl font-black text-teal-300">{value}</p>
                  <p className="mt-2 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <p className="text-sm font-bold text-slate-400">DEMO LOGIN</p>
            <h2 className="mt-3 text-3xl font-black">进入招聘决策台</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">用于演示最小闭环，不连接真实后端和候选人隐私数据。</p>
            <label className="mt-8 block text-sm font-bold text-slate-600">用户名</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-teal-400 focus:bg-white" placeholder="请输入用户名" defaultValue="123" />
            <label className="mt-5 block text-sm font-bold text-slate-600">密码</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none transition focus:border-teal-400 focus:bg-white" placeholder="请输入密码" type="password" defaultValue="123" />
            <button onClick={onLogin} className="mt-8 w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-teal-600">
              启动 MVP Demo
            </button>
            <p className="mt-5 text-center text-sm text-slate-400">演示账号：123 / 123</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function PortfolioHome() {
  const portfolioProjects = [
    {
      name: 'AI 知识库答疑系统 Demo',
      description: '基于 RAG 架构设计的文档问答系统，支持知识库检索、答案生成与引用溯源。',
      role: '产品设计 / Demo 搭建 / 流程设计',
      tags: ['RAG', '知识库问答', 'Prompt', 'AI 产品设计'],
      href: '#/knowledge-demo',
    },
    {
      name: '伯乐一号，智能招聘评估系统',
      description: '面向企业招聘场景的 AI 人才评价系统，通过多 Agent 决策辅助 HR 提升筛选效率。',
      role: '产品负责人 / 需求分析 / 商业计划 / 产品方案设计',
      tags: ['AI 招聘', 'Agent', 'ToB 产品', '多模态分析'],
      href: '#/bole-one',
    },
    {
      name: '学科陪跑与 AI 诊断产品',
      description: '面向高中学生与家长的学情诊断和陪跑规划产品，围绕学生画像、学科诊断和执行规划形成服务闭环。',
      role: '产品策划 / 用户洞察 / 服务流程设计 / 内容运营',
      tags: ['教育产品', '用户画像', '诊断报告', '服务设计'],
      href: '#/study-coach',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <a href="#top" className="text-base font-black text-slate-950">范与恒</a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
          <a className="transition hover:text-teal-700" href="#about">关于我</a>
          <a className="transition hover:text-teal-700" href="#projects">作品集</a>
          <a className="transition hover:text-teal-700" href="#contact">联系</a>
        </nav>
      </header>

      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24">
        <div>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            AI 产品经理方向 · 大模型应用产品
          </div>
          <h1 className="mt-7 text-4xl font-black leading-tight text-slate-950 sm:text-6xl">范与恒</h1>
          <p className="mt-4 text-xl font-bold text-teal-800 sm:text-2xl">AI 产品经理方向</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            具备软件工程背景与 AI 产品实践意识，关注大模型应用、RAG、Agent 与 AI 工作流，能够结合产品设计、技术理解与 Vibe-Coding 推进可落地的 AI Demo。
          </p>
          <div className="mt-6 max-w-2xl rounded-2xl border border-sky-200 bg-sky-50/80 px-5 py-4 text-sm leading-7 text-slate-700 shadow-sm">
            <span className="font-bold text-sky-800">公开版本说明：</span>
            个人网页展示内容为可公开版本，主要呈现早期 Demo、产品思路与交互原型；部分完整方案因涉及团队资料与业务细节未完全公开，可在面试中进一步说明。
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-teal-700">
              查看作品集
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-800">
              简历可按需提供
            </a>
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Portfolio 2026</p>
          <h2 className="mt-4 text-3xl font-black text-slate-950">AI Product Manager</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {['RAG', 'Agent', 'Prompt', 'PRD', 'Vibe-Coding'].map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">学校</p><p className="mt-1 font-bold">浙江工商大学</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">专业</p><p className="mt-1 font-bold">软件工程</p></div>
            <div className="col-span-2 rounded-2xl bg-slate-50 p-4"><p className="text-slate-500">当前目标</p><p className="mt-1 font-bold">AI 产品经理实习机会</p></div>
          </div>
        </aside>
      </section>

      <section id="about" className="border-y border-slate-200 bg-white px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">About</p>
          <h2 className="mt-3 text-3xl font-black">围绕 AI 产品落地建立能力结构</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['产品能力', '需求分析、PRD、原型设计、竞品分析'],
              ['AI 产品能力', 'Prompt、RAG、Agent、AI 工作流'],
              ['技术理解', 'React、TypeScript、Python、SQL、API 联调'],
              ['实践经历', '竞赛项目、AI Demo、教育产品、行业学习'],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Projects</p>
          <h2 className="mt-3 text-3xl font-black">项目作品集</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">每个项目都围绕真实场景、用户问题、产品方案和 Demo 能力展开，展示从产品思考到可交互原型的推进能力。</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article key={project.name} className="flex min-h-[24rem] flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-black leading-snug">{project.name}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>
                <p className="mt-5 text-sm"><span className="font-bold">我的角色：</span>{project.role}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
                <a href={project.href} className="mt-auto inline-flex w-fit items-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700">
                  查看详情
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">Methodology</p>
          <h2 className="mt-3 text-3xl font-black">项目详情方法论</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {['项目背景', '用户痛点', '目标用户', '产品目标', '核心流程', '功能结构', '原型 / Demo', '技术理解', '产品指标', '项目复盘'].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-bold text-teal-300">{String(index + 1).padStart(2, '0')}</p>
                <p className="mt-2 text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">联系方式</h2>
            <p className="mt-3 text-slate-600">正在寻找 AI 产品经理实习机会</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4"><p className="text-sm text-slate-500">邮箱</p><p className="mt-1 font-bold">可在简历中查看</p></div>
            <a className="rounded-2xl border border-slate-200 p-4 hover:bg-teal-50" href="https://github.com/maybebebee"><p className="text-sm text-slate-500">GitHub</p><p className="mt-1 break-words font-bold">github.com/maybebebee</p></a>
            <div className="rounded-2xl border border-slate-200 p-4"><p className="text-sm text-slate-500">微信</p><p className="mt-1 font-bold">可在简历中查看</p></div>
            <div className="rounded-2xl border border-slate-200 p-4"><p className="text-sm text-slate-500">状态</p><p className="mt-1 font-bold">寻找 AI PM 实习</p></div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#/bole-one') {
    return <BoleOneDemo />;
  }

  if (route === '#/study-coach') {
    return <StudyCoachDetail />;
  }

  if (route === '#/knowledge-demo') {
    return <KnowledgeDemo />;
  }

  return <PortfolioHome />;
}

function KnowledgeDemo() {
  const [mode, setMode] = useState<'knowledge' | 'mistake'>('knowledge');
  const [question, setQuestion] = useState('为什么物体做匀速圆周运动时速度变了，但速率不变？');
  const [mistake, setMistake] = useState('已知小球在半径为 0.5m 的圆轨道上做匀速圆周运动，周期为 2s，求向心加速度。我把 v=2πr 直接代入 a=v²/r，漏掉了周期。');

  const relatedProblems = [
    ['基础同类', '圆周运动中的线速度计算', '半径为 0.4m 的小球做匀速圆周运动，周期为 4s，求线速度大小。', '先补齐 v = 2πr / T 的使用条件。'],
    ['变式迁移', '由频率求向心加速度', '某物体以 2Hz 的频率做半径 0.2m 的匀速圆周运动，求向心加速度。', '把周期 T 和频率 f 的关系迁移到公式选择。'],
    ['易错压轴', '圆周运动综合辨析', '汽车通过半径 50m 的弯道，速度为 10m/s，判断向心加速度方向并计算大小。', '巩固“方向改变”和“大小计算”两个知识点。'],
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#/" className="text-sm font-bold text-slate-500 transition hover:text-indigo-700">← 返回作品集</a>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">AI 知识库答疑系统 Demo</div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-700">RAG Learning Assistant</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              知识点答疑
              <span className="block text-indigo-700">与错题同类题推荐</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              这个 MVP 用于展示 RAG 类教育产品的最小闭环：学生提出问题，系统从知识库检索依据并生成解释；学生输入错题，系统识别错误原因并推荐同类练习。
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)]">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['知识库检索', '课本概念、公式、例题、易错点'],
                ['答案生成', '分层解释，先讲人话再给公式'],
                ['练习推荐', '基于错因生成同类题路径'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-black">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">MVP 工作台</h2>
              <p className="mt-2 text-sm text-slate-500">模拟前端交互，不调用 API Key，便于投递展示与产品讲解。</p>
            </div>
            <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
              <button onClick={() => setMode('knowledge')} className={`rounded-xl px-4 py-2 text-sm font-bold transition ${mode === 'knowledge' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'}`}>知识点回复</button>
              <button onClick={() => setMode('mistake')} className={`rounded-xl px-4 py-2 text-sm font-bold transition ${mode === 'mistake' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'}`}>错题推荐</button>
            </div>
          </div>

          {mode === 'knowledge' ? (
            <div className="grid gap-6 pt-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-600">学生问题</span>
                  <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="mt-2 min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400 focus:bg-white" />
                </label>
                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="font-black text-indigo-800">产品动作</p>
                  <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    <li>1. 识别问题意图：概念辨析 + 公式理解</li>
                    <li>2. 检索知识库：圆周运动、速度、速率、向心加速度</li>
                    <li>3. 生成解释：先给直观类比，再给物理定义</li>
                  </ol>
                </div>
              </div>
              <div className="space-y-4">
                <AnswerCard title="AI 回复" />
                <div className="grid gap-4 md:grid-cols-2">
                  <SourceCard title="知识库引用 01" content="速度是矢量，既有大小也有方向；速率是标量，只表示速度大小。" />
                  <SourceCard title="知识库引用 02" content="匀速圆周运动中，速度方向沿切线不断变化，因此速度变化；但速度大小保持不变。" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 pt-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-600">错题输入</span>
                  <textarea value={mistake} onChange={(event) => setMistake(event.target.value)} className="mt-2 min-h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400 focus:bg-white" />
                </label>
                <div className="rounded-2xl bg-rose-50 p-4">
                  <p className="font-black text-rose-700">错因识别</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    学生把线速度公式写成 v = 2πr，漏掉周期 T，本质是“公式条件缺失”和“变量关系未建模”。
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black">同类题推荐路径</h3>
                <p className="mt-2 text-sm text-slate-500">按“补概念 → 迁移公式 → 综合应用”排序，避免只刷相似题。</p>
                <div className="mt-5 space-y-4">
                  {relatedProblems.map(([level, title, content, target], index) => (
                    <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-indigo-700">推荐 {index + 1} · {level}</p>
                          <h4 className="mt-2 font-black">{title}</h4>
                        </div>
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">同类题</span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{content}</p>
                      <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">训练目标：{target}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['用户痛点', '学生问完题后只得到答案，无法知道自己缺的是概念、公式还是迁移能力。'],
            ['产品目标', '把答疑、溯源、错因识别和同类题推荐串成一个可持续学习闭环。'],
            ['后续扩展', '接入真实知识库、错题本、学习画像和阶段性诊断报告。'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AnswerCard({ title }: { title: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">{title}</h3>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">已生成</span>
      </div>
      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
        <p>你可以把“速度”和“速率”理解成两个层级：速率只关心跑得快不快，速度还要关心朝哪个方向跑。</p>
        <p>匀速圆周运动里的“匀速”，指的是速率不变。物体一直沿圆的切线方向运动，位置不断改变，切线方向也不断改变，所以速度这个矢量是在变化的。</p>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="font-bold">一句话总结</p>
          <p className="mt-2">速率不变，是因为速度大小恒定；速度变了，是因为方向一直在变。</p>
        </div>
      </div>
    </div>
  );
}

function SourceCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
      <p className="text-sm font-black text-indigo-800">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{content}</p>
    </div>
  );
}

function StudyCoachDetail() {
  const portraitTypes = [
    ['01', '绩优局限型', '成绩很好，但只活在学习这一维度里，对自我、职业、关系的认知严重缺失', ['学习能力强', '认知视野窄', '进大学后迷茫']],
    ['02', '空转努力型', '每天大量学习，但方法低效，时间投入和成绩产出严重不匹配', ['刷题量大', '效率低下', '感动自己']],
    ['03', '躺平失联型', '意义感断路，不学的时候平静而非焦虑，已经与学习断开连接', ['不学时平静', '找不到理由', '低温疏离']],
    ['04', '高台跳水型', '初中优秀，升入高中后成绩断崖下滑，自我形象崩塌，陷入回避循环', ['落差巨大', '我变笨了', '回避挑战']],
    ['05', '外驱依赖型', '学习动力完全依赖外部驱动，父母催、老师管才动，外力一撤就停', ['被推才学', '缺乏自主', '依赖监督']],
    ['06', '家庭压力转移型', '家庭催促、比较、争吵等压力直接转移到学习状态上，情绪消耗大', ['关系紧张', '情绪内耗', '沟通困难']],
    ['07', '基础重建型', '知识体系存在大量断层，当前学习进度和实际掌握程度差距很大', ['断层多', '听不懂新课', '越学越乱']],
    ['08', '自驱精进型', '有清晰目标和自主学习意识，遇到成绩天花板，需要方法和认知系统升级', ['目标明确', '执行力强', '需要升级']],
    ['09', '思而不行型', '对学习有想法和思考，能讲出逻辑，但从不落地实践，纸上谈兵', ['想法很多', '从不执行', '知行脱节']],
  ];

  const reports = [
    {
      title: '物理学科诊断报告',
      desc: '用于展示学情诊断、知识断层定位、学习建议与后续陪跑策略。',
      href: './reports/physics_diagnosis_report.pdf',
      meta: 'PDF · 诊断报告',
    },
    {
      title: '化学课程规划与备课方案 第1期',
      desc: '用于展示从诊断到课程规划、阶段目标、备课结构和执行节奏的闭环。',
      href: './reports/chemistry_course_plan_phase1.pdf',
      meta: 'PDF · 课程规划',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-amber-100 bg-[#fbfaf7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#/" className="text-sm font-bold text-slate-500 transition hover:text-amber-700">← 返回作品集</a>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">学科陪跑与 AI 诊断产品</div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-700">AI Study Coach</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              从一次诊断开始，
              <span className="block text-amber-700">形成可执行的陪跑方案</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              这个详情页展示学科陪跑产品的两个核心产物：学生画像体系与个性化学习方案，并附上两份真实报告材料作为 Demo 佐证。
            </p>
          </div>
          <div className="rounded-[28px] border border-amber-100 bg-white p-6 shadow-[0_24px_70px_rgba(120,53,15,0.08)]">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['画像诊断', '识别学习状态与情绪底色'],
                ['知识断层', '定位薄弱模块和补基路径'],
                ['陪跑计划', '把建议转化为每周任务'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl bg-amber-50 p-4">
                  <p className="font-black text-amber-800">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-amber-700">学生画像体系</p>
              <h2 className="mt-2 text-3xl font-black">九大学习者画像类型</h2>
              <p className="mt-3 text-slate-600">精准识别 · 对症介入 · 专属路径</p>
            </div>
            <div className="text-6xl font-black text-amber-100">09</div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {portraitTypes.map(([num, title, desc, tags]) => (
              <article key={num as string} className="rounded-2xl border border-slate-200 bg-[#fffdf8] p-5">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">PORTRAIT · {num}</span>
                  <span className="text-4xl font-black text-slate-100">{num}</span>
                </div>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">{desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(tags as string[]).map((tag) => <span key={tag} className="rounded-lg bg-white px-2 py-1 text-xs text-slate-600 shadow-sm">{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-amber-100 bg-white p-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-4xl font-black">
              专属于你的 <span className="text-amber-700">个性化学习方案</span>
            </h2>
            <p className="mt-3 text-slate-600">从了解你这个人开始 · 到真正属于你的学习路径</p>
          </div>
          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-3">
            {[
              ['精准画像诊断', '先搞清楚你是谁，再谈怎么学'],
              ['知识框架重建', '找到断层，按逻辑顺序补基础'],
              ['执行闭环管理', '每周检验，持续迭代，不走弯路'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-lg font-black">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <LearningStep label="初" title="第一次课：深度诊断与方案制定" steps={['学习者画像诊断', '学科知识框架诊断', '个性化方案制定']} />
            <LearningStep label="续" title="每次课程：三段式推进结构" steps={['上周执行计划检验', '知识框架搭建与能力培养', '制定下周学习方案']} />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {['不是补课，是重建', '不是管理，是陪伴', '不是追进度，是内化', '不是单一学科，是体系'].map((item) => (
              <div key={item} className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-center font-bold text-amber-900">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Reports</p>
          <h2 className="mt-2 text-3xl font-black">报告材料</h2>
          <p className="mt-3 text-slate-600">两份 PDF 可直接在线预览，也可以新窗口打开。</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {reports.map((report) => (
            <article key={report.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
                <div>
                  <p className="text-xs font-bold text-amber-700">{report.meta}</p>
                  <h3 className="mt-2 text-xl font-black">{report.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{report.desc}</p>
                </div>
                <a href={report.href} target="_blank" rel="noreferrer" className="shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700">打开</a>
              </div>
              <iframe title={report.title} src={report.href} className="h-[520px] w-full bg-slate-50" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function LearningStep({ label, title, steps }: { label: string; title: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#fffdf8] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-black text-white">{label}</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black">{title}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-amber-100 bg-white p-4">
                <p className="text-xs font-bold text-amber-700">STEP {String(index + 1).padStart(2, '0')}</p>
                <p className="mt-2 font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activePage, onChange }: { activePage: PageKey; onChange: (page: PageKey) => void }) {
  return (
    <aside className="hidden rounded-[24px] border border-white bg-slate-950 p-3 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:block">
      <div className="px-3 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Workflow</p>
        <p className="mt-2 text-lg font-black">MVP 闭环</p>
      </div>
      <nav className="mt-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activePage === item.key ? 'bg-white text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-8 rounded-3xl bg-white/10 p-4">
        <p className="text-sm font-bold">演示目标</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">展示 AI 产品经理如何把招聘流程拆成可验证的最小闭环。</p>
      </div>
    </aside>
  );
}

function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between rounded-[24px] border border-white bg-white/80 px-5 py-4 shadow-sm backdrop-blur sm:px-7">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">B1</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            <a href="#/" className="transition hover:text-teal-600">返回作品集</a>
          </p>
          <h1 className="text-xl font-black">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input className="hidden rounded-2xl bg-slate-100 px-5 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-teal-200 sm:block" placeholder="搜索候选人 / 岗位" />
        <span className="hidden rounded-full bg-teal-50 px-3 py-2 text-sm font-bold text-teal-600 sm:inline">MVP</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">HR</span>
      </div>
    </header>
  );
}

function Dashboard({ onNavigate, onPickJob }: { onNavigate: (page: PageKey) => void; onPickJob: (job: Job) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ['总简历数', '91', '👤', 'blue'],
          ['已初筛简历', '90', '▣', 'green'],
          ['已完成面试', '31', '✓', 'amber'],
          ['已总结推荐', '28', '♕', 'purple'],
        ].map(([label, value, icon, color]) => (
          <Panel key={label} className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-4xl font-black">{value}</p>
            </div>
            <div className={`rounded-2xl bg-${color}-50 px-4 py-3 text-2xl`}>{icon}</div>
          </Panel>
        ))}
      </div>

      <Panel>
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-black">快捷操作</h2>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-4">
          {[
            ['岗位设置', '配置招聘标准', 'jobs'],
            ['简历筛选', '上传并筛选简历', 'screening'],
            ['面试辅助', '开始沉浸式面试', 'interview'],
            ['综合分析', '生成推荐报告', 'analysis'],
          ].map(([title, desc, key]) => (
            <button key={title} onClick={() => onNavigate(key as PageKey)} className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50">
              <p className="font-black">{title}</p>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Panel className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">最近筛选任务</h2>
            <button className="text-sm font-bold text-blue-500">查看全部</button>
          </div>
          <div className="space-y-3">
            {candidates.slice(0, 4).map((candidate) => (
              <button key={candidate.name} onClick={() => onNavigate('analysis')} className="w-full rounded-xl border-l-4 border-green-400 bg-slate-50 p-4 text-left">
                <p className="font-bold">{candidate.name} <span className="ml-2 rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">{candidate.role}</span></p>
                <p className="mt-2 text-sm text-slate-500">已完成 · 综合 {candidate.score}</p>
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">岗位简历</h2>
            <button onClick={() => onNavigate('jobs')} className="text-sm font-bold text-blue-500">管理岗位</button>
          </div>
          <div className="space-y-3">
            {jobs.map((job) => (
              <button key={job.title} onClick={() => onPickJob(job)} className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 text-left hover:bg-blue-50">
                <span className="font-semibold">{job.title}</span>
                <span className="rounded bg-blue-50 px-2 py-1 text-sm text-blue-500">{job.count} 份</span>
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function JobsPage({ selectedJob, onSelectJob, onRunScreening }: { selectedJob: Job; onSelectJob: (job: Job) => void; onRunScreening: () => void }) {
  return (
    <div className="space-y-6">
      <Panel className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-xl font-black">招聘岗位管理</h2>
          <p className="mt-1 text-sm text-slate-500">配置岗位要求，生成可执行的筛选标准</p>
        </div>
        <div className="flex gap-2">
          <Badge>AI智能生成岗位描述</Badge>
          <Badge color="green">支持多岗位配置</Badge>
        </div>
      </Panel>
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Panel>
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h3 className="font-black">岗位列表</h3>
            <button className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-bold text-white">+ 新建岗位</button>
          </div>
          <div className="space-y-3 p-5">
            {jobs.map((job) => (
              <button key={job.title} onClick={() => onSelectJob(job)} className={`w-full rounded-xl border p-4 text-left ${selectedJob.title === job.title ? 'border-blue-400 bg-blue-50' : 'border-transparent bg-slate-50'}`}>
                <div className="flex items-center justify-between">
                  <p className="font-black">{job.title}</p>
                  <span className="text-sm text-red-400">删除</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{job.count} 份简历 · {job.status}</p>
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h3 className="font-black">编辑岗位</h3>
            <div className="flex gap-3">
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm">AI 生成</button>
              <button onClick={onRunScreening} className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white">保存并初筛</button>
            </div>
          </div>
          <div className="space-y-5 p-6">
            <Field label="岗位名称" value={selectedJob.title} />
            <Field label="所属部门" value="AI 产品与算法平台部" />
            <Field label="岗位描述" value="负责招聘场景下算法模型、智能体流程与评估体系建设，支持简历理解、候选人匹配、面试辅助和综合推荐。" textarea />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="最低工作经验" value="2 年" />
              <Field label="薪资范围" value="18k - 35k 元/月" />
            </div>
            <Field label="必备技能" value="Python / 机器学习 / 大模型应用 / 数据分析 / 工程落地" />
            <Field label="学历要求" value="本科及以上" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">岗位状态</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-600">启用</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ScreeningPage({
  candidates,
  selectedJob,
  selectedCandidate,
  screeningDone,
  onRunScreening,
  onSelectCandidate,
  onInterview,
  onAnalysis,
}: {
  candidates: Candidate[];
  selectedJob: Job;
  selectedCandidate: Candidate;
  screeningDone: boolean;
  onRunScreening: () => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onInterview: () => void;
  onAnalysis: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[260px_1fr_340px]">
      <Panel className="overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-black">招聘岗位</h3>
          <p className="text-sm text-slate-500">拖拽候选人到岗位可调整分配</p>
        </div>
        <div className="space-y-3 p-4">
          {jobs.map((job) => (
            <div key={job.title} className={`rounded-xl p-4 ${job.title === selectedJob.title ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-300' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <p className="font-black">{job.title}</p>
                <span className="rounded-full bg-white px-2 py-1 text-sm">{job.count}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-black">{selectedJob.title}</h2>
            <p className="text-sm text-slate-500">共 {selectedJob.count} 份简历 · 初筛阈值 80 分</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm">智能匹配</button>
            <button onClick={onRunScreening} className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white">
              {screeningDone ? '重新初筛' : '一键初筛'}
            </button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3">候选人</th>
              <th className="px-5 py-3">初筛评分</th>
              <th className="px-5 py-3">状态</th>
              <th className="px-5 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.name} onClick={() => onSelectCandidate(candidate)} className={`cursor-pointer border-t border-slate-100 ${selectedCandidate.name === candidate.name ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                <td className="px-5 py-4 font-bold">{candidate.name}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-lg px-3 py-1 font-bold ${candidate.score >= 90 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{candidate.score}</span>
                  <span className="ml-2 text-xs text-slate-400">技:{candidate.skill} 项:{candidate.project} 职:{candidate.career}</span>
                </td>
                <td className="px-5 py-4"><Badge color="green">{screeningDone ? candidate.status : '待筛选'}</Badge></td>
                <td className="px-5 py-4 text-blue-500">查看报告</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <CandidatePanel candidate={selectedCandidate} onInterview={onInterview} onAnalysis={onAnalysis} />
    </div>
  );
}

function CandidatePanel({ candidate, onInterview, onAnalysis }: { candidate: Candidate; onInterview: () => void; onAnalysis: () => void }) {
  return (
    <Panel className="overflow-hidden">
      <div className="bg-slate-50 p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-3xl font-black text-white">{candidate.score}</div>
        <h3 className="mt-4 text-xl font-black">{candidate.name}</h3>
        <p className="text-sm text-slate-500">{candidate.role}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <ScoreBox label="技能" value={candidate.skill} />
          <ScoreBox label="项目" value={candidate.project} />
          <ScoreBox label="职业" value={candidate.career} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        <button onClick={onAnalysis} className="rounded-lg bg-blue-500 py-2 text-sm font-bold text-white">初筛报告</button>
        <button onClick={onInterview} className="rounded-lg bg-green-500 py-2 text-sm font-bold text-white">进入面试</button>
      </div>
      <div className="space-y-4 border-t border-slate-100 p-5 text-sm">
        <p><span className="text-slate-400">城市：</span>{candidate.city}</p>
        <p><span className="text-slate-400">学历：</span>{candidate.degree} · {candidate.school}</p>
        <p><span className="text-slate-400">经验：</span>{candidate.experience}</p>
        <div className="flex flex-wrap gap-2">{candidate.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      </div>
      <div className="border-t border-slate-100 p-5">
        <h4 className="font-black">AI 分析过程</h4>
        <ol className="mt-4 space-y-3 text-sm text-slate-500">
          {['解析简历结构', '岗位要求匹配', '生成多维评分', '输出面试建议'].map((item, index) => (
            <li key={item} className="flex items-center gap-3"><span className="rounded-full bg-blue-50 px-2 py-1 text-blue-500">{index + 1}</span>{item}</li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}

function InterviewPage({ candidate, onFinish }: { candidate: Candidate; onFinish: () => void }) {
  return (
    <div className="space-y-6">
      <Panel className="p-8">
        <h2 className="text-3xl font-black">面试辅助系统</h2>
        <p className="mt-3 text-slate-500">智能追问推荐 · 实时语音转写 · AI 模拟演示</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-8">
            <p className="text-lg font-black">AI 模拟演示</p>
            <p className="mt-2 text-sm text-slate-500">当前候选人：{candidate.name}</p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-400 bg-white p-8 shadow-xl shadow-indigo-100">
            <p className="text-lg font-black">真人实时面试</p>
            <p className="mt-2 text-sm text-slate-500">语音转文字，智能追问推荐</p>
          </div>
        </div>
      </Panel>
      <Panel className="p-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-4xl text-white">◉</div>
          <h2 className="mt-8 text-3xl font-black">真人实时语音面试</h2>
          <p className="mt-3 text-slate-500">面试官实时提问，系统自动转写候选人语音并推荐追问</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['追问数量', '2', '每轮回答后推荐的追问数量'],
              ['候选问题数', '3', '不同角度的备选问题数量'],
              ['简历兴趣点', '2个', '从简历中提取的可提问兴趣点'],
            ].map(([title, value, desc]) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-100">
                <p className="text-3xl font-black text-blue-500">{value}</p>
                <p className="mt-4 font-black">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-4 text-left">
            {[
              ['检查麦克风', '确保候选人的麦克风正常工作'],
              ['追问推荐', '围绕项目贡献、技术取舍和业务理解生成追问'],
              ['生成面试纪要', '结构化沉淀候选人回答与风险点'],
            ].map(([title, desc], index) => (
              <div key={title} className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-slate-100 px-4 py-2 font-black">{index + 1}</span>
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </div>
                </div>
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white">检测</button>
              </div>
            ))}
          </div>
          <button onClick={onFinish} className="mt-8 rounded-xl bg-green-500 px-8 py-3 font-bold text-white">完成面试并生成综合分析</button>
        </div>
      </Panel>
    </div>
  );
}

function AnalysisPage({ candidate, selectedJob, onTalent }: { candidate: Candidate; selectedJob: Job; onTalent: () => void }) {
  const nodes = ['简历文件', '岗位要求', 'AI 初筛 Agent', '初筛报告', '候选人画像', '综合分析 Agent', '最终推荐报告'];
  return (
    <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
      <Panel className="p-5">
        <h3 className="font-black">候选人综合管理</h3>
        <p className="mt-1 text-sm text-slate-500">当前岗位：{selectedJob.title}</p>
        <div className="mt-5 space-y-2">
          {candidates.map((item, index) => (
            <button key={item.name} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${item.name === candidate.name ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50'}`}>
              <span className="rounded-lg bg-white px-3 py-2 text-sm font-black">{index + 1}</span>
              <span><b>{item.name}</b><br /><span className="text-xs text-slate-500">初筛 {item.score}分</span></span>
            </button>
          ))}
        </div>
      </Panel>
      <Panel className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">{candidate.name}</h2>
            <p className="text-sm text-slate-500">{candidate.role} · 数据完整度 88%</p>
          </div>
          <Badge color="green">{candidate.status}</Badge>
        </div>
        <div className="mt-6 h-2 rounded-full bg-slate-100">
          <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
        <div className="mt-8 rounded-3xl border border-indigo-200 bg-[radial-gradient(circle_at_1px_1px,#dbeafe_1px,transparent_0)] bg-[size:24px_24px] p-8">
          <div className="grid gap-5 lg:grid-cols-4">
            {nodes.map((node, index) => (
              <div key={node} className={`rounded-2xl border p-5 ${index <= 4 ? 'border-indigo-300 bg-white' : 'border-slate-200 bg-white/70 opacity-70'}`}>
                <p className="text-sm font-black">{node}</p>
                <p className="mt-3 text-sm text-slate-500">{index <= 4 ? '已完成' : '待生成'}</p>
                {index === 3 && <p className="mt-3 text-3xl font-black text-indigo-500">{candidate.score}分</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <InsightCard title="推荐理由" items={candidate.highlights} color="green" />
          <InsightCard title="面试追问风险" items={candidate.risks} color="amber" />
        </div>
        <button onClick={onTalent} className="mt-6 rounded-xl bg-blue-500 px-6 py-3 font-bold text-white">同步到人才库</button>
      </Panel>
    </div>
  );
}

function TalentPage({ candidates }: { candidates: Candidate[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ['90', '候选人总数'],
          ['3.1 年', '平均工作年限'],
          ['杭州(47)', '热门城市'],
          ['本科(44)', '主要学历'],
        ].map(([value, label]) => (
          <Panel key={label} className="p-6">
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{label}</p>
          </Panel>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-6">
          <h2 className="font-black">岗位-技能关联图</h2>
          <div className="relative mt-8 h-[520px] overflow-hidden rounded-3xl bg-white">
            {['AI算法工程师', '具身智能-研发工程师', '计算机视觉-研发工程师', 'Python后端工程师'].map((item, index) => (
              <div key={item} className="absolute rounded-full bg-rose-500 px-5 py-5 text-center text-sm font-black text-white shadow-xl" style={{ left: `${24 + index * 15}%`, top: `${18 + (index % 2) * 38}%` }}>{item}</div>
            ))}
            {['Python', 'PyTorch', 'SQL', '机器学习', 'TensorFlow', 'OpenCV', 'ROS', 'YOLO', 'Flask', 'Django', 'RAG', 'LLM'].map((item, index) => (
              <div key={item} className="absolute rounded-full bg-green-300 px-4 py-3 text-sm font-bold text-green-900" style={{ left: `${8 + (index * 13) % 78}%`, top: `${10 + (index * 17) % 75}%` }}>{item}</div>
            ))}
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel className="p-6">
            <h2 className="font-black">学历岗位分布</h2>
            <div className="mx-auto mt-8 flex h-56 w-56 items-center justify-center rounded-full bg-[conic-gradient(#6366f1_0_48%,#7c3aed_48%_78%,#ec4899_78%_90%,#f59e0b_90%)]">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-center text-sm font-black">本科 48%<br />硕士 47%</div>
            </div>
          </Panel>
          <Panel className="p-6">
            <h2 className="font-black">推荐人才池</h2>
            <div className="mt-4 space-y-3">
              {candidates.slice(0, 4).map((candidate) => (
                <div key={candidate.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <span className="font-bold">{candidate.name}</span>
                  <Badge color="green">{candidate.score} 分</Badge>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'amber' }) {
  const styles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[color]}`}>{children}</span>;
}

function Field({ label, value, textarea = false }: { label: string; value: string; textarea?: boolean }) {
  return (
    <label className="grid gap-2 text-sm sm:grid-cols-[120px_1fr] sm:items-start">
      <span className="pt-3 font-medium text-slate-500">{label}</span>
      {textarea ? (
        <textarea className="min-h-24 rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" defaultValue={value} />
      ) : (
        <input className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" defaultValue={value} />
      )}
    </label>
  );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function InsightCard({ title, items, color }: { title: string; items: string[]; color: 'green' | 'amber' }) {
  return (
    <div className={`rounded-2xl border p-5 ${color === 'green' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
      <h3 className="font-black">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

export default App;

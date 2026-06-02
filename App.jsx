import { useMemo, useState } from 'react';

const project = {
  name: '智能项目任务管理',
  department: '产品与技术',
  status: '进行中',
  owner: '张经理',
  team: '5 人',
  start: '2026-06-01',
  end: '2026-08-15',
  milestone: '设计 → 开发 → 验收',
  progress: 68,
  dependencies: '需求评审、资源确认',
};

const tasks = [
  {
    id: 'T-001',
    name: '项目结构与需求定义',
    owner: '李华',
    status: '已完成',
    progress: 100,
    planEnd: '2026-06-08',
    actualEnd: '2026-06-07',
    hours: 28,
    comment: '按时完成，需求明确。',
  },
  {
    id: 'T-002',
    name: '原型设计与交互评审',
    owner: '王敏',
    status: '进行中',
    progress: 72,
    planEnd: '2026-06-18',
    actualEnd: '',
    hours: 36,
    comment: 'UI 细节待确认。',
  },
  {
    id: 'T-003',
    name: '前端页面与响应式开发',
    owner: '陈超',
    status: '进行中',
    progress: 56,
    planEnd: '2026-07-05',
    actualEnd: '',
    hours: 52,
    comment: '移动端适配正在推进。',
  },
];

const milestones = [
  { title: '需求确认', date: '2026-06-05', status: '完成' },
  { title: '原型评审', date: '2026-06-12', status: '进行中' },
  { title: '开发启动', date: '2026-06-20', status: '待开始' },
];

const notifications = [
  {
    title: '任务“原型设计与交互评审”未更新状态',
    time: '2小时前',
    level: '提示',
  },
  {
    title: '“前端页面与响应式开发”依赖项待确认',
    time: '14小时前',
    level: '预警',
  },
  {
    title: '项目整体进度已达到 68%',
    time: '今天 09:20',
    level: '正常',
  },
];

const featureOptions = [
  { id: 'alerts', title: '智能预警', description: '快速识别风险任务，生成提醒与建议。' },
  { id: 'dashboard', title: '可视化仪表盘', description: '用图表展示项目进度、任务分布与完成率。' },
  { id: 'responsive', title: '响应式布局', description: '模拟设备视图，展示 PC 与移动端适配效果。' },
];

function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function FeatureBadge({ option, active, onClick }) {
  return (
    <button
      type="button"
      className={`feature-button ${active ? 'active' : ''}`}
      onClick={() => onClick(option.id)}
    >
      {option.title}
    </button>
  );
}

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.id} · {task.name}</h3>
      <div className="task-meta">
        <span className="tag">负责人：{task.owner}</span>
        <span className="tag">状态：{task.status}</span>
        <span className="tag">计划完成：{task.planEnd}</span>
      </div>
      <div className="section-split" />
      <ProgressBar value={task.progress} />
      <div className="task-footer">
        <span>进度：{task.progress}%</span>
        <span>用时：{task.hours}h</span>
        <span>备注：{task.comment}</span>
      </div>
    </div>
  );
}

function MilestoneCard({ item }) {
  return (
    <div className="milestone-card">
      <div className="milestone-row">
        <strong>{item.title}</strong>
        <span className="tag">{item.status}</span>
      </div>
      <p className="milestone-date">计划时间：{item.date}</p>
    </div>
  );
}

function NotificationCard({ item }) {
  return (
    <div className="notice-card">
      <strong>{item.title}</strong>
      <div className="notice-meta">
        <span>{item.time}</span>
        <span>{item.level}</span>
      </div>
    </div>
  );
}

function AlertsFeature() {
  return (
    <div className="feature-panel">
      <div className="feature-panel-header">
        <h3>智能预警</h3>
        <p>自动分析任务风险，并提供优先处理建议。</p>
      </div>
      <div className="alert-grid">
        <div className="alert-card warning">
          <strong>依赖项阻塞</strong>
          <p>“前端页面与响应式开发”依赖“原型设计与交互评审”完成后方可进入下一阶段。</p>
          <button type="button">查看依赖</button>
        </div>
        <div className="alert-card tip">
          <strong>提醒：状态未更新</strong>
          <p>“原型设计与交互评审”已接近计划完成日期，请及时同步进度。</p>
          <button type="button">更新状态</button>
        </div>
        <div className="alert-card success">
          <strong>进度正常</strong>
          <p>当前整体进度为 68%，项目仍在可控范围内。</p>
          <button type="button">查看详情</button>
        </div>
      </div>
    </div>
  );
}

function DashboardFeature() {
  const completedCount = tasks.filter((task) => task.status === '已完成').length;
  const inProgressCount = tasks.filter((task) => task.status === '进行中').length;

  return (
    <div className="feature-panel">
      <div className="feature-panel-header">
        <h3>可视化仪表盘</h3>
        <p>展示关键指标与任务分布，帮助快速判断项目健康度。</p>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="dashboard-label">完成任务</span>
          <strong>{completedCount}/{tasks.length}</strong>
          <ProgressBar value={(completedCount / tasks.length) * 100} />
        </div>
        <div className="dashboard-card">
          <span className="dashboard-label">进行中</span>
          <strong>{inProgressCount}</strong>
          <ProgressBar value={(inProgressCount / tasks.length) * 100} />
        </div>
        <div className="dashboard-card">
          <span className="dashboard-label">整体进度</span>
          <strong>{project.progress}%</strong>
          <ProgressBar value={project.progress} />
        </div>
      </div>
    </div>
  );
}

function ResponsiveFeature() {
  const [device, setDevice] = useState('desktop');
  const inProgressCount = tasks.filter((task) => task.status === '进行中').length;

  return (
    <div className="feature-panel">
      <div className="feature-panel-header">
        <h3>响应式布局</h3>
        <p>切换视图，验证 PC 和移动端页面在同一个应用中的适配效果。</p>
      </div>
      <div className="device-switcher">
        <button type="button" className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')}>PC 预览</button>
        <button type="button" className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')}>移动预览</button>
      </div>
      <div className={`device-preview ${device}`}>
        <div className="preview-header">{device === 'desktop' ? '桌面端预览' : '移动端预览'}</div>
        <div className="preview-content">
          <div className="preview-stat">
            <span>项目进度</span>
            <strong>{project.progress}%</strong>
          </div>
          <div className="preview-stat">
            <span>当前状态</span>
            <strong>{project.status}</strong>
          </div>
          <div className="preview-stat">
            <span>待处理任务</span>
            <strong>{inProgressCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const taskCount = useMemo(() => tasks.length, []);
  const completed = useMemo(() => tasks.filter((task) => task.status === '已完成').length, []);
  const [activeFeature, setActiveFeature] = useState('alerts');

  return (
    <div className="app-shell">
      <div className="page-header">
        <div>
          <h1>AI 项目任务管理原型</h1>
          <p>通过任务拆解、进度更新与智能预警，让项目状态一目了然，支持 PC 与手机端自适应体验。</p>
        </div>
        <div className="badge-group feature-tabs">
          {featureOptions.map((option) => (
            <FeatureBadge
              key={option.id}
              option={option}
              active={activeFeature === option.id}
              onClick={setActiveFeature}
            />
          ))}
        </div>
      </div>

      <div className="panel feature-overview">
        {activeFeature === 'alerts' && <AlertsFeature />}
        {activeFeature === 'dashboard' && <DashboardFeature />}
        {activeFeature === 'responsive' && <ResponsiveFeature />}
      </div>

      <div className="grid-layout">
        <div className="panel hero-tile">
          <div className="project-summary">
            <div className="metric-card">
              <small>项目状态</small>
              <div className="metric-value">{project.status}</div>
            </div>
            <div className="metric-card">
              <small>当前进度</small>
              <div className="metric-value">{project.progress}%</div>
            </div>
            <div className="metric-card">
              <small>任务数量</small>
              <div className="metric-value">{taskCount}</div>
            </div>
          </div>

          <div className="project-meta">
            <div className="meta-row">
              <span className="meta-label">项目名称</span>
              <span className="meta-value">{project.name}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">部门</span>
              <span className="meta-value">{project.department}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">负责人</span>
              <span className="meta-value">{project.owner}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">团队成员</span>
              <span className="meta-value">{project.team}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">计划周期</span>
              <span className="meta-value">{project.start} ~ {project.end}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">依赖项</span>
              <span className="meta-value">{project.dependencies}</span>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-row">
              <div className="timeline-cell">
                <small>项目里程碑</small>
                <div className="status-pill">{project.milestone}</div>
              </div>
              <div className="timeline-cell">
                <small>完成任务</small>
                <div className="status-pill">{completed}/{taskCount}</div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-cell">
                <small>整体进度</small>
                <ProgressBar value={project.progress} />
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>预警与通知</h2>
          <div className="notifications">
            {notifications.map((item) => (
              <NotificationCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid-layout" style={{ marginTop: 24 }}>
        <div className="panel">
          <h2>任务列表</h2>
          <div className="card-list">
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>里程碑</h2>
          <div className="card-list">
            {milestones.map((item) => (
              <MilestoneCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

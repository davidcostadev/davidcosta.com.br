import css from './projects.css';

const listProjects = [
  {
    name: 'Withmoney',
    bg: 'colniza',
    year: 2018,
    labels: [
      'Node.js',
      'Vue',
      'React',
    ]
  },
  {
    name: 'newcommerce',
    year: 2018,
    labels: [
      'Node.js',
      'React',
      'Next.js',
    ]
  },
  {
    name: 'Riot Acampamento Yordle',
    year: 2018,
    labels: [
      'Typescript',
      'Node.js',
      'React',
    ]
  },
  {
    name: 'Colniza',
    year: 2017,
    labels: [
      'CakePHP',
    ]
  },
  {
    name: 'Carro no Minuto',
    year: 2017,
    labels: [
      'CakePHP',
      'Cordova',
      'Framework7',
    ],
  },
  {
    name: 'Whatsfácil',
    year: 2016,
    labels: [
      'CakePHP',
      'Socket',
      'Node.js',
    ],
  },
  {
    name: 'Mundial Megastore',
    year: 2015,
    labels: [
      'Joomla'
    ],
  },
];

const Label = ({ label }) => (
  <span className={css.label}>{label}</span>
);

const Labels = ({ labels }) => {
  if (!labels.length) return null;

  return (
    <div className={css.labels}>
      {labels.map(label => (
        <Label key={label} label={label} />
      ))}
    </div>
  )
}

const getBackground = (bg) => bg ? ({
  backgroundImage: `url(../static/images/project-${bg}.png)`,
}) : null

const Project = ({ project }) => (
  <div className={css.item}>
    <div className={css.inner}>
      <div className={css.bg} style={getBackground(project.bg)}>
        <div className={css.texts}>
          <h4 className={css.name}>{project.name}</h4>
          <div className={css.year}>{project.year}</div>
          <Labels labels={project.labels} />
        </div>
      </div>
    </div>
  </div>
);

const ProjectsList = ({ projects }) => {
  if (!projects.length) return null;

  return (
    <div className={css.list}>
      {projects.map(project => (
        <Project key={project.name} project={project} />
      ))}
    </div>
  );
};

const Projects = () => (
  <div id="projects" className={css.block}>
    <div className={css.container}>
      <h3 className={css.title}>Projects</h3>
      <p className={css.subtitle}>My recents projects</p>

      <ProjectsList projects={listProjects} />

      <button type="button" className={css.button}>See More</button>
    </div>
  </div>
);

export default Projects;

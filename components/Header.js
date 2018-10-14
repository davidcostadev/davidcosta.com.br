import Link from 'next/link';
import classnames from 'classnames';
import nav from './nav.css'
import header from './header.css'

class Header extends React.Component {
  constructor(props) {
    super(props);

    // this.refNav = React.createRef()

    this.state = {
      initialOffsetTop: 0,
      fixed: false,
    }

    this.navOnScroll = this.navOnScroll.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll);
  }

  navOnScroll() {
    if (!this.refNav) return
    
    if (!this.state.initialOffsetTop) {
      this.setState({
        initialOffsetTop: this.refNav.offsetTop - this.refNav.clientHeight,
      });
    }

    if (window.scrollY > this.state.initialOffsetTop) {
      this.setState({ fixed: true });
    } else {
      this.setState({ fixed: false });
    }
  }

  render() {
    return (
      <nav ref={(ref) => this.refNav = ref} className={classnames(header.block, {
        [header.fixed]: this.state.fixed,
      })}>
        <div className={header.brand}>
          David Costa
        </div>
        <ul className={classnames(header.nav, nav.block)}>
          <li className={nav.item}>
            <a href="#about" className={nav.link}>About</a>
            <a href="#projects" className={nav.link}>Projects</a>
            <a href="#contact" className={nav.link}>Contact</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header;

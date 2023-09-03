import h from './header.module.scss';
import { Link } from 'react-router-dom';
import { Button13040 } from '../atoms/Buttons';
import { Text14600 } from '../atoms/Text';
import Logo from '../../images/logo.svg';
import Search from '../../images/Search.svg';
import Notification from '../../images/notification.svg'

const Header = () => {
    return (
        <>
        <div className={h.wrapper}>
          <Link to='/'>
          <div className={h.logo__wrapper}>
            <img src={Logo} alt="logo" />
          </div>
          </Link>
          <div className={h.functions__wrapper}>
           <img src={Search} alt="icon" />
           <img src={Notification} alt="icon" />
           <Button13040 text={<Text14600 text='Sign in'/>}/>
          </div>
        </div>
        <div className={h.wrapper__mobile}>
          <div className={h.burger}>

          </div>
          <Link to='/'>
          <div className={h.logo__wrapper}>
            <img src={Logo} alt="logo" />
          </div>
          </Link>
          <div className={h.functions__wrapper}>
          <img src={Search} alt="icon" />
          </div>
        </div>
        </>
    )
}

export default Header;
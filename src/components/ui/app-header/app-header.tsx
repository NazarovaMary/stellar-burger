import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <BurgerIcon type={'primary'} />
        <NavLink
          to='/'
          className={({
            isActive
          }) => `text text_type_main-default ml-2 mr-10 ${styles.link}
           ${isActive ? styles.link_active : ''}
            `}
        >
          Конструктор
        </NavLink>
        <NavLink
          to='/feed'
          className={({
            isActive
          }) => `text text_type_main-default ml-2 mr-10 ${styles.link}
           ${isActive ? styles.link_active : ''}
            `}
        >
          Лента заказов
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.link_position_last} data-cy='profile'>
        <ProfileIcon type={'primary'} />
        <NavLink
          to='/profile'
          className={({
            isActive
          }) => `text text_type_main-default ml-2 mr-10 ${styles.link}
           ${isActive ? styles.link_active : ''}
            `}
        >
          {userName ?? 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);

import React, { FunctionComponent, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { TdAnchorItemProps } from './type';
import useConfig from '../_util/useConfig';
import { AnchorContext } from './AnchorContext';

export type AnchorItemProps = TdAnchorItemProps;

const AnchorItem: FunctionComponent<AnchorItemProps> = (props) => {
  const { onClick, activeItem, registerItem, unregisterItem } = useContext(AnchorContext);
  const { href, title, target, className, children = [], ...rest } = props;

  const { classPrefix } = useConfig();

  const titleAttr = typeof title === 'string' ? title : null;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick({ title: titleAttr, href }, e);
  };

  useEffect(() => {
    registerItem(href);
    return () => unregisterItem(href);
  }, [href, registerItem, unregisterItem]);

  return (
    <div
      className={classNames(
        `${classPrefix}-anchor__item`,
        { [`${classPrefix}-is-active`]: activeItem === href },
        className,
      )}
      {...rest}
    >
      <a
        href={href}
        className={classNames(`${classPrefix}-anchor__item-link`)}
        title={titleAttr}
        target={target}
        onClick={(e) => handleClick(e)}
      >
        {title}
      </a>
      {children}
    </div>
  );
};

export default AnchorItem;

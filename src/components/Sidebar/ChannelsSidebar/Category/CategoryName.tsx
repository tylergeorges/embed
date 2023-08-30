import { forwardRef } from 'react';
import { Category } from '@graphql/graphql';
import * as Styles from '../styles';

interface CategoryNameProps {
  toggleIsOpen: () => void;
  category: Category;
  isCategoryOpen: boolean;
}

export const CategoryName = forwardRef<HTMLDivElement, CategoryNameProps>(
  ({ toggleIsOpen, category, isCategoryOpen }, ref) => (
    <Styles.CategoryNameContainer ref={ref} onClick={toggleIsOpen}>
      <Styles.CategoryNameArrow opened={isCategoryOpen} />
      <Styles.CategoryNameContent draggable={false}>{category.name}</Styles.CategoryNameContent>
    </Styles.CategoryNameContainer>
  )
);

CategoryName.displayName = 'CategoryName';

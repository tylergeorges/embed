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
    <Styles.CategoryNameContainer ref={ref} className="category-name_container non-dragable">
      <Styles.CategoryNameArrow opened={isCategoryOpen} className="category-name_arrow" />
      <Styles.CategoryNameContent
        onClick={toggleIsOpen}
        draggable={false}
        className="category-name non-dragable"
      >
        {category.name}
      </Styles.CategoryNameContent>
    </Styles.CategoryNameContainer>
  )
);

CategoryName.displayName = 'CategoryName';

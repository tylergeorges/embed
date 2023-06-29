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
    <Styles.CategoryNameContainer ref={ref} className="non-dragable">
      <Styles.CategoryNameArrow opened={isCategoryOpen} className="category-name_arrow" />
      <Styles.CategoryNameContent onClick={toggleIsOpen} draggable={false} className="non-dragable">
        {category.name}
      </Styles.CategoryNameContent>
    </Styles.CategoryNameContainer>
  )
);

CategoryName.displayName = 'CategoryName';

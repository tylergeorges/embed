import { forwardRef } from 'react';
import { Category } from '@graphql/graphql';
import { CategoryNameContent, CategoryNameContainer, CategoryNameArrow } from '../elements';

interface CategoryNameProps {
  toggleIsOpen: () => void;
  category: Category;
  isCategoryOpen: boolean;
}

export const CategoryName = forwardRef<HTMLDivElement, CategoryNameProps>(({ toggleIsOpen, category, isCategoryOpen }, ref) => (
  <CategoryNameContainer ref={ref} className="category-name_container non-dragable">
    <CategoryNameArrow opened={isCategoryOpen} className="category-name_arrow" />
    <CategoryNameContent onClick={toggleIsOpen} draggable={false} className="category-name non-dragable">
      {category.name}
    </CategoryNameContent>
  </CategoryNameContainer>
));

CategoryName.displayName = 'CategoryName';

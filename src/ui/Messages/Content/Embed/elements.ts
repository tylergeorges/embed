import styled, {css} from "react-emotion";
import ExpandableImage from "@ui/shared/ExpandableImage";

export const MediaEmbedBase = css`
  border-radius: 3px;
`;

export namespace EmbedStyle {
  interface BaseProps {
    color: string | undefined;
    thumbnailIsLarge: boolean;
  }

  export const Base = styled.article<BaseProps>`
    padding: 16px 16px 16px 12px;
    border-left: 4px solid ${props => props.color ?? props.theme.colors._background.darken(0.7).string()};
    background-color: ${props => props.theme.colors._background.darken(0.1).string()};
    border-radius: 3px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 520px;

    ${props => props.thumbnailIsLarge && css`
      max-width: 432px;
    `}
  `;

  interface ContentAndThumbnailProps {
    thumbnailIsLarge: boolean;
  }

  export const ContentAndThumbnail = styled.div<ContentAndThumbnailProps>`
    display: flex;
    gap: 16px;
    
    ${props => props.thumbnailIsLarge && css`
      flex-direction: column;
      max-width: 432px;
    `}
  `;

  export const Content = styled.div`
    display: grid;
    gap: 8px;
  `;

  export const Image = styled(ExpandableImage)<{large?: boolean}>`
    border-radius: 3px;
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    display: flex;
    
    ${props => props.large && css`
      margin-top: 8px;
    `}
  `;

  interface AuthorProps {
    urlPresent: boolean;
  }

  export const Author = styled.div<AuthorProps>`
    font-size: 14px;
    font-weight: 600;
    display: inline-grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8px;
    color: ${props => props.theme.colors._primary.string()};
    
    ${props => props.urlPresent && css`
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    `}
  `;

  export const AuthorIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 100%;
  `;

  export const AuthorName = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    
    a {
      color: ${props => props.theme.colors._primary.string()};
    }
  `;

  export const Provider = styled.div`
    font-size: 12px;
    color: ${props => props.theme.colors._primary.darken(0.1).string()};
  `;

  export const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
  `;

  export const TitleWithUrl = styled.a`
    font-size: 16px;
    font-weight: 600;
  `;

  export const Description = styled.div`
    font-size: 14px;
    color: ${props => props.theme.colors._primary.darken(0.1).string()};
  `;

  export const Footer = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors._primary.darken(0.1).string()};
  `;

  export const FooterIcon = styled.img`
    border-radius: 100%;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  `;

  export const Fields = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 4px;
    gap: 8px;
  `;

  export const Field = styled.div<{inline?: boolean}>`
    flex: 0;
    max-width: 506px;
    ${({inline}) =>
      inline
        ? css`
          width: fit-content;
          flex-basis: 30%;
        `
        : css`
          flex-basis: 100%;
        `
    }
  `;

  export const FieldName = styled.div`
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 600;
    color: ${props => props.theme.colors._primary.string()};
  `;

  export const FieldValue = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme.colors._primary.darken(0.1).string()};
  `;
}

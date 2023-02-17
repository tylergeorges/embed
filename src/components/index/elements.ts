import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  padding: '0 2 rem'
});

// export const Main = styled.main`
//   min-height: 100vh;
//   padding: 4rem 0;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

export const Main = styled('main', {
  'min-height': '100vh',
  padding: '4rem 0',
  flex: 1,
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'center',
  'align-items': 'center'
});

// export const Footer = styled.footer`
//   display: flex;
//   flex: 1;
//   padding: 2rem 0;
//   border-top: 1px solid #eaeaea;
//   justify-content: center;
//   align-items: center;
//
//   @media (prefers-color-scheme: dark) {
//     border-color: #222;
//   }
// `;

export const Footer = styled('footer', {
  display: 'flex',
  flex: 1,
  padding: '2rem 0',
  'border-top': '1px solid #eaeaea',
  'justify-content': 'center',
  'align-items': 'center',
  '@media (prefers-color-scheme: dark)': {
    'border-color': '#222'
  }
});

// export const FooterLink = styled.a`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-grow: 1;
// `;

export const FooterLink = styled('a', {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  'flex-grow': 1
});

// export const TitleLink = styled.a`
//   color: #0070f3;
//   text-decoration: none;
//
//   :hover,
//   :focus,
//   :active {
//     text-decoration: underline;
//   }
// `;

export const TitleLink = styled('a', {
  color: '#0070f3',
  'text-decoration': 'none',

  ':hover': {
    'text-decoration': 'underline'
  },
  ':focus': {
    'text-decoration': 'underline'
  },
  ':active': {
    'text-decoration': 'underline'
  }
});

// export const Title = styled.h1`
//   margin: 0;
//   line-height: 1.15;
//   font-size: 4rem;
//   text-align: center;
// `;

export const Title = styled('h1', {
  margin: 0,
  'line-height': '1.15',
  'font-size': '4rem',
  'text-align': 'center'
});

// export const Description = styled.p`
//   text-align: center;
//   margin: 4rem 0;
//   line-height: 1.5;
//   font-size: 1.5rem;
// `;

export const Description = styled('p', {
  'text-align': 'center',
  margin: '4rem 0',
  'line-height': '1.5',
  'font-size': '1.5rem'
});

// export const Card = styled.a`
//   margin: 1rem;
//   padding: 1.5rem;
//   text-align: left;
//   color: inherit;
//   text-decoration: none;
//   border: 1px solid #eaeaea;
//   border-radius: 10px;
//   transition: color 0.15s ease, border-color 0.15s ease;
//   max-width: 300px;
//
//   :hover,
//   :focus,
//   :active {
//     color: #0070f3;
//     border-color: #0070f3;
//   }
//
//   @media (prefers-color-scheme: dark) {
//     border-color: #222;
//   }
// `;

export const Card = styled(
  'a',
  `
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #222;
  }
`
);

// export const CardTitle = styled.h2`
//   margin: 0 0 1rem 0;
//   font-size: 1.5rem;
// `;

export const CardTitle = styled('h2', {
  margin: '0 0 1rem 0',
  'font-size': '1.5rem'
});

// export const CardDescription = styled.p`
//   margin: 0;
//   font-size: 1.25rem;
//   line-height: 1.5;
// `;

export const CardDescription = styled('p', {
  margin: 0,
  'font-size': '1.25rem',
  'line-height': '1.5'
});

// export const Code = styled.code`
//   background: #fafafa;
//   border-radius: 5px;
//   padding: 0.75rem;
//   font-size: 1.1rem;
//   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
//     Bitstream Vera Sans Mono, Courier New, monospace;
//
//   @media (prefers-color-scheme: dark) {
//     border-color: #111;
//   }
// `;

export const Code = styled('code', {
  background: '#fafafa',
  'border-radius': '5px',
  padding: '0.75rem',
  'font-size': '1.1rem',
  'font-family':
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',

  '@media (prefers-color-scheme: dark)': {
    'border-color': '#111'
  }
});

// export const Grid = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   max-width: 800px;
//
//   @media (max-width: 600px) {
//     width: 100%;
//     flex-direction: column;
//   }
// `;

export const Grid = styled('div', {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'flex-wrap': 'wrap',
  'max-width': '800px',

  '@media (max-width: 600px)': {
    width: '100%',
    'flex-direction': 'column'
  }
});

// export const Logo = styled.span`
//   height: 1em;
//   margin-left: 0.5rem;
// `;

export const Logo = styled('span', {
  height: '1em',
  'margin-left': '0.5rem'
});

// export const LogoImg = styled.img`
//   @media (prefers-color-scheme: dark) {
//     border-color: #222;
//   }
// `;

export const LogoImg = styled('img', {
  '@media (prefers-color-scheme: dark)': {
    'border-color': '#222'
  }
});

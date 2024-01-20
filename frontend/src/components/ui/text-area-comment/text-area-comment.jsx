import { forwardRef } from 'react';
import styled from 'styled-components';

import { STYLES } from '../../../constants';

const Wrapper = styled.label`
  display: block;
  background-color: ${({ theme }) => theme.color.base};
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: ${STYLES.RADII.MEDIUM};
  padding: 0.8rem 3rem;
  width: 100%;
`;

const TextAreaCommentContainer = forwardRef(({ className, ...props }, ref) => {
  return (
    <Wrapper>
      <textarea
        className={className}
        {...props}
        name="text"
        ref={ref}
      ></textarea>
    </Wrapper>
  );
});

export const TextAreaComment = styled(TextAreaCommentContainer)`
  all: unset;
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || 0};
  background-color: ${({ theme }) => theme.color.base};
  border: none;
  color: ${({ theme }) => theme.color.text};
  font-size: ${STYLES.FS.SMALL};
  font-style: italic;
`;

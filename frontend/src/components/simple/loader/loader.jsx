import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(192, 192, 192, 0.2);
`;

const LoaderContainer = ({ className, width }) => {
  return (
    <Wrapper>
      <div className={className}>
        <RotatingLines strokeColor="grey" width={`${width || 60}`} />
      </div>
    </Wrapper>
  );
};

export const Loader = styled(LoaderContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

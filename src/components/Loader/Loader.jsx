import { InfinitySpin } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

export function Loader() {
  return (
    <LoaderStyled>
      <InfinitySpin width="200" color="#4fa94d" />
    </LoaderStyled>
  );
}

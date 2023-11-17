import { StyledBtn, StyledBtnBox } from './Button.styled';

export function LoadMoreBtn({ onLoadMore }) {
  return (
    <StyledBtnBox>
      <StyledBtn onClick={onLoadMore} type="button">
        load more
      </StyledBtn>
    </StyledBtnBox>
  );
}

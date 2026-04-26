import styled from 'styled-components'

const Textarea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  width: 100%;
  min-height: 8rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-100);
  }
`

export default Textarea

import React from 'react'
import styled , {css} from "styled-components"

export default function MintBtn({number}) {
	return (
		<MintBtnStyled>
			<form action="">
				<input type="number" name="mint"  min="1" max="100" value="1" />
			</form>
		</MintBtnStyled>
	)
}

const MintBtnStyled = styled.div`
	margin-bottom: 300px;
	input {
		font-family: "Montserrat Bold", sans-serif;
		font-size: 16px;
		line-height: 1.88;
		color: #fff;
		border: unset;
		cursor: pointer;
		min-width: 271px;
		padding: 20px 30px;
		background: #433395;
		border-radius: 16px;
		&:hover{
			background: linear-gradient(90.66deg, #5E44FF 8.53%, #C76BFF 94.11%);
		}
		:focus{
			outline: none;
		}
	}
`
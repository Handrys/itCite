const IS_OPEN = 'isOpenDialog'
const VARIANT_DIALOG = 'variantDialog'
const SELECT_DIALOG = 'selectDialog'
const CHANGE_ANSWER = 'changeAnswerDialog'
const CHANGE_PROPS = 'changePropsDialog'

export const dialogReducer = (state, action) => {
    switch (action.type) {
        case IS_OPEN: {
            return {
                ...state,
                isOpen: action.payload.isOpen,
                variant: action.payload.variant,
                succes: action.payload.succes,
                dialogTitle: action.payload.dialogTitle,
                dialogText: action.payload.dialogText,
                propsDialog: action.payload.propsDialog
            }
        }
        case CHANGE_ANSWER: {
            return {
                ...state,
                answer: action.payload.answer,
            }
        }
        case CHANGE_PROPS: {
            return {
                ...state,
                propsDialog: action.payload.propsDialog
            }
        }
        default:
            return state
    }
    
}
import { useReducer } from "react"

type CounterState = {
    count: number
}

type CounterAction = {
    type: "increase" | "decrease"
}

const initialState = {
        count: 0
    }

const reducerFunction = (state: CounterState, action: CounterAction): CounterState => {
       switch(action.type){
        case 'increase':
            return {...state, count: state.count + 1 }

        case 'decrease':
            return {...state, count: state.count - 1 }

        default: 
        return state;

       }
    }
export function Counter(){
    
    const [state, dispatch] = useReducer(reducerFunction, initialState)

    return (
      <>
        <div className="flex flex-col items-center justify-center rounded-2xl p-6 shadow-xl w-fit mx-auto my-5 font-sans">
          {/* Counter Zahl */}
          <p className="text-5xl font-bold text-white mb-4 drop-shadow-md select-none">
            {state.count}
          </p>

          {/* Button Container */}
          <div className="flex gap-4">
            <button
              onClick={() => dispatch({ type: "decrease" })}
              className="w-14 h-12 flex items-center justify-center text-2xl font-semibold bg-[#2d2d34] text-[#d8d8d8] border border-[#3f3f46] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#3f3f46] hover:scale-105 active:scale-95"
            >
              -
            </button>
            <button
              onClick={() => dispatch({ type: "increase" })}
              className="w-14 h-12 flex items-center justify-center text-2xl font-semibold bg-[#2d2d34] text-[#d8d8d8] border border-[#3f3f46] rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#3f3f46] hover:scale-105 active:scale-95"
            >
              +
            </button>
          </div>
        </div>
      </>
    );
}

import { useState } from 'react'
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type typeListOfThree = {
    [key: string]: boolean
}

function App() {
    const [listOfThree, setListOfThree] = useState<typeListOfThree>({
        good: false,
        cheap: false,
        fast: false,
    })

    function handleDecision(clickedValue: string) {
        const otherValue = { ...listOfThree };
        delete otherValue[clickedValue];

        const currentClickedValue = !listOfThree[clickedValue];
        const isAllTrue = Object.values(otherValue)
            .filter((filtered) => filtered === true)
            .length === Object.keys(otherValue).length;
        const randomOtherValueIndex = Math.floor(Math.random() * Object.keys(otherValue).length);
        const pickRandomOtherValueKeys = Object.keys(otherValue)[randomOtherValueIndex];

        if (isAllTrue) {
            otherValue[pickRandomOtherValueKeys] = false;
        }

        const newListOfThreeValue = {
            ...otherValue,
            [clickedValue]: currentClickedValue, 
        }

        setListOfThree({
            good: newListOfThreeValue.good,
            cheap: newListOfThreeValue.cheap,
            fast: newListOfThreeValue.fast,
        });
    }

    return (
        <section
            className={cn(
                'relative w-[100%] text-[#fafafa] min-h-[100vh] flex items-center justify-center bg-[#09090b]',
            )}
        >
            <ul
                className={cn(
                    'w-[fit-content] flex flex-col flex-wrap justify-center',
                    'max-w-[100%] m-[0_auto] rounded-[12px] p-[24px]',
                )}
            >
                {
                    Object.keys(listOfThree).map((list, idx) => {
                        return (
                            <li
                                key={idx}
                                className={cn(
                                    'w-[120px] max-w-[100%] flex items-center',
                                    idx > 0 && 'mt-[18px]',
                                )}
                            >
                                <div
                                    className={cn(
                                        'relative flex-[0_0_54px] rounded-full',
                                        'p-[6px] cursor-pointer',
                                        'transition-all duration-[0.5s] ease-in-out',
                                        listOfThree[list] === true ? 'bg-[#16a34a]' : 'bg-[#a1a1aa]',
                                    )}
                                    onClick={() => handleDecision(list)}
                                >
                                    <div
                                        className={cn(
                                            'relative w-[18px] h-[18px] rounded-full bg-[#fafafa]',
                                            'transition-all duration-[0.5s] ease-in-out',
                                            listOfThree[list] === true ? 'translate-x-[24px]' : 'translate-x-[0]',
                                        )}
                                    />
                                </div>
                                <div
                                    className={cn(
                                        'ml-[18px] flex-[1_1_100%] font-semibold text-sm',
                                        'uppercase'
                                    )}
                                >
                                    {list}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default App;

import { Button, TextInput, NativeSelect, Switch, Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

const UserLocation = () => {

    const theme = useMantineTheme();
    const [checked, setChecked] = useState(false);
    return (
        <div style={{ width: "72.5%" }} className="flex flex-col">
            <div className='bg-white ml-8 w-full rounded-md py-4 px-12'>
                <p className='text-lg'>Хаяг</p>
                <div className='mt-1'>
                    <p className='text-xs' style={{ color: "rgba(0, 30, 29, 0.45)" }}>Орон нутаг</p>
                    <Switch
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                        color="teal"
                        size="sm"
                    />

                </div>
                <div className='mt-2 flex flex-row w-full gap-12'>

                    <div style={{ width: "50%" }}>
                        <TextInput
                            placeholder=''
                            label="Хот"
                            styles={{
                                label: {
                                    color: "rgba(0, 30, 29, 0.45);"
                                },
                                input: {
                                    backgroundColor: "#EBEFEE",
                                    border: "none"
                                }
                            }}
                        />
                    </div>
                    <div style={{ width: "50%" }}   >
                        <NativeSelect
                            data={['1-р хороо', '2-р хороо', '3-р хороо', '4-р хороо']}
                            label="Дүүрэг"
                            styles={{
                                label: {
                                    color: "rgba(0, 30, 29, 0.45);"
                                },
                                input: {
                                    backgroundColor: "#EBEFEE",
                                    border: "none"
                                }
                            }}
                        />
                    </div>

                </div>
            </div>
            <div className='flex flex-row justify-end mt-4 ml-8 w-full'>
                <Button variant={"outline"} color={"red"} style={{ fontWeight: "normal" }}>
                    Арилгах
                </Button>
                <Button variant={"filled"} className="ml-4" style={{ backgroundColor: "#F9BC60", fontWeight: "normal" }}>
                    Хадгалах
                </Button>
            </div>
        </div>
    )
}

export default UserLocation
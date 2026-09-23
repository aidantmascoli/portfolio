'use client'

import { useReducer } from 'react';
import { Card, CardBody, Input, Select, SelectItem, Textarea } from "@heroui/react";
import AMButton from "@/app/_components/button";

// Form reducer
const initialState = {
    name: '',
    email: '',
    interest: new Set([]),
    message: '',
    sending: false,
    errors: {}
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
                errors: {
                    ...state.errors,
                    [action.field]: '' // Clear error when field is updated
                }
            };
        case 'SET_SENDING':
            return {
                ...state,
                sending: action.value
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const inputClasses = {
    base: 'flex-1',
    label: 'text-inherit!',
    input: '!text-foreground',
    inputWrapper: [
        'transition-all!',
        'border-indigo-500',
        'data-[hover=true]:border-indigo-400',
        'data-[focus=true]:border-indigo-600!',
        'text-indigo-500',
        'data-[hover=true]:text-indigo-400',
        'data-[focus=true]:text-indigo-600!',
    ]
}

const errorInputClasses = {
    base: 'flex-1',
    label: 'text-inherit!',
    input: 'text-inherit!',
    inputWrapper: [
        'border-red-500!',
        'text-red-500!',
    ],
    errorMessage: 'text-red-500!',
}

export default function Inquire() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const interests = [
        { key: "webdev", label: "Web Development", color: "orange" },
        { key: "video", label: "Videography", color: "yellow" },
        { key: "music", label: "Music", color: "green" },
        { key: "performance", label: "Performance", color: "blue" },
        { key: "other", label: "Other", color: "violet" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const errors = {};
        if (!state.name.trim()) errors.name = 'Name is required';
        if(!state.email.match('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')) errors.email = 'Must be a valid email';
        if (!state.email.trim()) errors.email = 'Email is required';
        if (!state.message.trim()) errors.message = 'Message is required';
        if (state.interest.size === 0) errors.interest = 'Please select an area of interest';

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors });
            return;
        }

        dispatch({ type: 'SET_SENDING', value: true });

        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

            // On success, reset the form
            dispatch({ type: 'RESET_FORM' });
        } catch (error) {
            dispatch({
                type: 'SET_ERRORS',
                errors: { submit: 'Failed to send message. Please try again.' }
            });
        } finally {
            dispatch({ type: 'SET_SENDING', value: false });
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-8 pt-20 sm:pt-24" id="smooth-wrapper">
            <div className="w-full max-w-4xl flex flex-col gap-8" id="smooth-content">
                <h1 className="text-indigo-500 text-center">Get In Touch</h1>

                <Card className="w-full">
                    <CardBody className="gap-6 bg-default-100">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input
                                    isRequired
                                    variant="bordered"
                                    type="text"
                                    label="Name"
                                    value={state.name}
                                    isInvalid={!!state.errors.name}
                                    errorMessage={state.errors.name}
                                    onValueChange={(value) =>
                                        dispatch({ type: 'SET_FIELD', field: 'name', value })
                                    }
                                    classNames={!state.errors.name ? inputClasses : errorInputClasses}
                                />
                                <Input
                                    isRequired
                                    variant="bordered"
                                    type="text"
                                    label="Email"
                                    value={state.email}
                                    isInvalid={!!state.errors.email}
                                    errorMessage={state.errors.email}
                                    onValueChange={(value) =>
                                        dispatch({ type: 'SET_FIELD', field: 'email', value })
                                    }
                                    classNames={!state.errors.email ? inputClasses : errorInputClasses}
                                />
                            </div>

                            <Select
                                isRequired
                                selectionMode="multiple"
                                variant="bordered"
                                label="Area(s) of Interest"
                                selectedKeys={state.interest}
                                isInvalid={!!state.errors.interest}
                                errorMessage={state.errors.interest}
                                onSelectionChange={(value) => {
                                    dispatch({ type: 'SET_FIELD', field: 'interest', value });
                                }}
                                classNames={{
                                    trigger: [
                                        'transition-all!',
                                        'border-indigo-500',
                                        'data-[hover=true]:border-indigo-400',
                                        'data-[open=true]:border-indigo-600!',
                                        'data-[focus=true]:border-indigo-500',
                                        'text-indigo-500',
                                        'data-[hover=true]:text-indigo-400',
                                        'data-[open=true]:text-indigo-600!',
                                        'data-[focus=true]:text-indigo-500',
                                    ],
                                    label: 'text-inherit!',
                                    value: '!text-foreground',
                                    popoverContent: [
                                        'bg-default-100'
                                    ]
                                }}
                            >
                                {interests.map((interest) => (
                                    <SelectItem key={interest.key} value={interest.key} className={`text-${interest.color}-500`}>{interest.label}</SelectItem>
                                ))}
                            </Select>

                            <Textarea
                                isRequired
                                variant="bordered"
                                label="Message"
                                placeholder="Enter your message"
                                value={state.message}
                                isInvalid={!!state.errors.message}
                                errorMessage={state.errors.message}
                                onValueChange={(value) =>
                                    dispatch({ type: 'SET_FIELD', field: 'message', value })
                                }
                                minRows={4}
                                classNames={!state.errors.name ? inputClasses : errorInputClasses}
                            />

                            {state.errors.submit && (
                                <p className="text-red-500 text-center">{state.errors.submit}</p>
                            )}

                            <div className="flex justify-center">
                                <AMButton
                                    type="submit"
                                    color="indigo"
                                    shade={500}
                                    isLoading={state.sending}
                                >
                                    {state.sending ? "Sending..." : "Send Message"}
                                </AMButton>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </main>
    );
}
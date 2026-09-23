'use client'

import { useReducer, useRef } from 'react';
import { Card, CardBody, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Turnstile } from "@marsidev/react-turnstile";
import AMButton from "@/app/_components/button";
import { sendInquiry } from "@/app/inquire/actions";
import { interests } from "@/app/inquire/interests";

// Form reducer
const initialState = {
    name: '',
    email: '',
    interest: new Set([]),
    message: '',
    company: '', // honeypot
    turnstileToken: '',
    sending: false,
    sent: false,
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
        case 'SET_TOKEN':
            return {
                ...state,
                turnstileToken: action.value,
                errors: { ...state.errors, submit: '' }
            };
        case 'SENT':
            return { ...initialState, sent: true };
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
    const turnstileRef = useRef(null);

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

        if (!state.turnstileToken) {
            dispatch({ type: 'SET_ERRORS', errors: { submit: 'Please wait for the verification check to finish.' } });
            return;
        }

        dispatch({ type: 'SET_SENDING', value: true });

        try {
            const result = await sendInquiry({
                name: state.name,
                email: state.email,
                interest: [...state.interest],
                message: state.message,
                company: state.company,
                turnstileToken: state.turnstileToken,
            });

            if (result.ok) {
                dispatch({ type: 'SENT' });
            } else {
                dispatch({ type: 'SET_ERRORS', errors: result.errors });
            }
        } catch (error) {
            dispatch({
                type: 'SET_ERRORS',
                errors: { submit: 'Failed to send message. Please try again.' }
            });
        } finally {
            dispatch({ type: 'SET_SENDING', value: false });
            // Turnstile tokens are single-use, so get a fresh one for any retry
            dispatch({ type: 'SET_TOKEN', value: '' });
            turnstileRef.current?.reset();
        }
    };

    if (state.sent) {
        return (
            <main className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-8 pt-20 sm:pt-24">
                <div className="w-full max-w-4xl flex flex-col gap-8">
                    <h1 className="text-indigo-500 text-center">Message Sent</h1>
                    <Card className="w-full">
                        <CardBody className="gap-6 bg-default-100 items-center text-center p-8">
                            <p className="text-lg">
                                Thanks for reaching out! I&apos;ll get back to you soon. A copy of your
                                message is on its way to your inbox.
                            </p>
                            <AMButton color="indigo" shade={500} onClick={() => dispatch({ type: 'RESET_FORM' })}>
                                Send Another
                            </AMButton>
                        </CardBody>
                    </Card>
                </div>
            </main>
        );
    }

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
                                classNames={!state.errors.message ? inputClasses : errorInputClasses}
                            />

                            {/* Honeypot: hidden from people, filled in by bots */}
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                                value={state.company}
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'company', value: e.target.value })}
                            />

                            <Turnstile
                                ref={turnstileRef}
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                options={{ theme: 'light', size: 'flexible', appearance: 'interaction-only' }}
                                onSuccess={(token) => dispatch({ type: 'SET_TOKEN', value: token })}
                                onExpire={() => dispatch({ type: 'SET_TOKEN', value: '' })}
                                onError={() => dispatch({ type: 'SET_ERRORS', errors: { submit: 'Verification failed to load. Please refresh the page.' } })}
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
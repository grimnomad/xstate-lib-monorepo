import { ActorRef, assign, createMachine, Sender, spawn } from "xstate";
import { User } from "./types";

function processMessage(context: any) {
    return (send: Sender<any>) => {
        if(context.user.id !== '1234') {

            send('SUCCESS')
        } else {
            send('FAILED')
        }
    }
}

function createTestMachine(user: User) {
    const machine = createMachine<{ processRef: ActorRef<any, any> | null, user: User}>({
        id: 'test',
        initial: 'processing',
        context: {
            processRef: null,
            user
        },
        states: {
            processing: {
                entry: 'onEntry',
                on: {
                    SUCCESS: {
                        target: 'success'
                    },
                    FAILED: {
                        target: 'failed'
                    }
                }
            },
            success: {
                type: 'final'
            },
            failed: {
                type: 'final'
            }
        }
    }, {
        actions: {
            onEntry: assign({
                processRef: (context) => spawn(processMessage(context))
            })
        }
    })

    return machine;
}

export { createTestMachine, processMessage }

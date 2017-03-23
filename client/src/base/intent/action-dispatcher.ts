import "reflect-metadata"
import {injectable, inject} from "inversify"
import {TYPES} from "../types"
import {Logger} from "../../utils"
import {Action, ActionHandlerRegistry} from "./actions"
import {ICommandStack} from "./command-stack"
import {UndoAction, RedoAction} from "../../features/undo-redo/undo-redo"

export interface IActionDispatcher {
    dispatch(action: Action): void
    dispatchAll(actions: Action[]): void
}

/**
 * Collects actions, converts them to commands and dispatches them.
 */
@injectable()
export class ActionDispatcher implements IActionDispatcher {

    @inject(ActionHandlerRegistry) protected actionHandlerRegistry: ActionHandlerRegistry
    @inject(TYPES.ICommandStack) protected commandStack: ICommandStack
    @inject(TYPES.Logger) protected logger: Logger

    dispatchAll(actions: Action[]): void {
        actions.forEach(action => this.dispatch(action))
    }

    dispatch(action: Action): void {
        if (action.kind == UndoAction.KIND)
            this.commandStack.undo()
        else if (action.kind == RedoAction.KIND)
            this.commandStack.redo()
        else if (this.actionHandlerRegistry.hasKey(action.kind))
            this.handleAction(action)
        else
            this.logger.warn('ActionDispatcher: missing command for action', action)
    }

    protected handleAction(action: Action): void {
        this.logger.log('ActionDispatcher: handle', action)
        const actionHandler = this.actionHandlerRegistry.get(action.kind)
        const result = actionHandler.handle(action)
        if (result.commands && result.commands.length > 0) {
            this.commandStack.execute(result.commands)
        }
        if (result.actions && result.actions.length > 0) {
            this.dispatchAll(result.actions)
        }
    }

}

export type ActionDispatcherProvider = () => Promise<IActionDispatcher>

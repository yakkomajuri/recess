import { kea, path, reducers, actions } from 'kea'

import type { newFeedModalLogicType } from './newFeedModalLogicType'

export const newFeedModalLogic = kea<newFeedModalLogicType>([
    path(['src', 'components', 'new-feed-modal', 'newFeedModalLogic']),
    actions(() => ({
        setIsModalOpen: (isModalOpen: boolean) => ({ isModalOpen }),
    })),
    reducers(({}) => ({
        isModalOpen: [
            false,
            {
                setIsModalOpen: (_, { isModalOpen }) => isModalOpen,
            },
        ],
    })),
])

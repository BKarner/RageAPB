/**
 * The native names and their hash.
 */
export const NATIVES: { [key: string]: string } = {
    // State.
    'SetPlayerControl': '0x8D32347D6D4C40A2', // TODO: Needs testing/implementation.
    'IsPlayerControlOn': '0x49C32D60007AFA47', // TODO: Needs testing/implementation.
    'IsPlayerClimbing': '0x95E8F73DC65EFB9C',
    'IsPlayerTargettingAnything': '0x78CFE51896B6B8A4', // TODO: Needs testing/implementation.
    'IsPlayerTargettingEntity': '0x7912F7FC4F6264B6', // TODO: Needs testing/implementation.
    'GetPlayerTargetEntity': '0x13EDE1A5DBF797C9', // TODO: Needs testing/implementation.
    'IsPlayerFreeAiming': '0x2E397FD2ECD37C87', // TODO: Needs testing/implementation.
    'IsPlayerFreeAimingAtEntity': '0x3C06B5C839B38F7B', // TODO: Needs testing/implementation.
    'GetEntityPlayerIsFreeAimingAt': '0x2975C866E6713290', // TODO: Needs testing/implementation.

    // Team.
    'SetPlayerTeam': '0x0299FA38396A4940',
    'GetPlayerTeam': '0x37039302F4E0A008',
    'GetNumberOfPlayersInTeam': '0x1FC200409F10E6F1',

    // AI Ped Interaction.
    'CanPedHearPlayer': '0xF297383AA91DCA29', // TODO: Needs testing/implementation.
    'SetEveryoneIgnoreThisPlayer': '0x8EEDA153AD141BA4', // TODO: Needs testing/implementation.
    'SetAllRandomPedsFlee': '0x056E0FE8534C2949', // TODO: Needs testing/implementation.

    // ----- DO WE NEED?
    // AI Ped Interaction.
    'ClearPlayerHasDamagedAtLeastOnePed': '0xF0B67A4DE6AB5F98', // TODO: Needs testing/implementation.
    'HasPlayerDamagedAtLeastOnePed': '0x20CE80B0C2BF4ACC', // TODO: Needs testing/implementation.
    'ClearPlayerHasDamagedAtLeastOneNonAnimalPed': '0x4AACB96203D11A31', // TODO: Needs testing/implementation.
    'HasPlayerDamagedAtLeastOneNonAnimalPed': '0xE4B90F367BD81752', // TODO: Needs testing/implementation.
}

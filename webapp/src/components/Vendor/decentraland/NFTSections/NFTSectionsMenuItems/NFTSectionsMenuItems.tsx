import React, { useCallback } from 'react'

import { isLandSection } from '../../../../../modules/ui/utils'
import { Section } from '../../../../../modules/vendor/decentraland/routing/types'
import { DropdownMenu } from '../../../../Menu/DropdownMenu'
import { MenuItem } from '../../../../Menu/MenuItem'
import { Props } from './NFTSectionsMenuItems.types'

const shouldRenderSection = (section: Section, sections: Section[]) => {
  return sections.includes(section) || sections.includes(Section.ALL)
}

const NFTSectionsMenuItems = ({ section, sections, onSectionClick }: Props) => {
  const handleOnSectionClick = useCallback(
    newSection => {
      if (section !== newSection) {
        onSectionClick(newSection)
      }
    },
    [onSectionClick, section]
  )

  return (
    <>
      {sections.includes(Section.ALL) && (
        <MenuItem key={Section.ALL} value={Section.ALL} currentValue={section} onClick={handleOnSectionClick} />
      )}
      {shouldRenderSection(Section.LAND, sections) && (
        <>
          <MenuItem key={Section.LAND} value={Section.LAND} currentValue={section} onClick={handleOnSectionClick} />
          {isLandSection(section)
            ? [Section.PARCELS, Section.ESTATES].map(menuSection => (
                <MenuItem key={menuSection} value={menuSection} currentValue={section} onClick={handleOnSectionClick} nestedLevel={1} />
              ))
            : null}
        </>
      )}
      {shouldRenderSection(Section.WEARABLES, sections) && (
        <>
          <MenuItem value={Section.WEARABLES} currentValue={section} onClick={handleOnSectionClick} />
          {[
            Section.WEARABLES,
            Section.WEARABLES_HEAD,
            Section.WEARABLES_FACIAL_HAIR,
            Section.WEARABLES_HAIR,
            Section.WEARABLES_EYES,
            Section.WEARABLES_EYEBROWS,
            Section.WEARABLES_MOUTH,
            Section.WEARABLES_UPPER_BODY,
            Section.WEARABLES_LOWER_BODY,
            Section.WEARABLES_FEET,
            Section.WEARABLES_ACCESSORIES,
            Section.WEARABLES_EARRING,
            Section.WEARABLES_EYEWEAR,
            Section.WEARABLES_HAT,
            Section.WEARABLES_HELMET,
            Section.WEARABLES_MASK,
            Section.WEARABLES_TIARA,
            Section.WEARABLES_TOP_HEAD,
            Section.WEARABLES_SKIN,
            Section.WEARABLES_HANDS
          ].includes(section!) ? (
            <>
              <DropdownMenu
                values={[
                  Section.WEARABLES_HEAD,
                  Section.WEARABLES_FACIAL_HAIR,
                  Section.WEARABLES_HAIR,
                  Section.WEARABLES_EYES,
                  Section.WEARABLES_EYEBROWS,
                  Section.WEARABLES_MOUTH
                ]}
                currentValue={section}
                onMenuItemClick={handleOnSectionClick}
              />
              <MenuItem
                key={Section.WEARABLES_UPPER_BODY}
                value={Section.WEARABLES_UPPER_BODY}
                currentValue={section}
                onClick={handleOnSectionClick}
                nestedLevel={1}
              />
              <MenuItem value={Section.WEARABLES_HANDS} currentValue={section} onClick={handleOnSectionClick} nestedLevel={1} />
              {[Section.WEARABLES_LOWER_BODY, Section.WEARABLES_FEET].map(menuSection => (
                <MenuItem key={menuSection} value={menuSection} currentValue={section} onClick={handleOnSectionClick} nestedLevel={1} />
              ))}

              <DropdownMenu
                values={[
                  Section.WEARABLES_ACCESSORIES,
                  Section.WEARABLES_EARRING,
                  Section.WEARABLES_EYEWEAR,
                  Section.WEARABLES_HAT,
                  Section.WEARABLES_HELMET,
                  Section.WEARABLES_MASK,
                  Section.WEARABLES_TIARA,
                  Section.WEARABLES_TOP_HEAD
                ]}
                currentValue={section}
                onMenuItemClick={handleOnSectionClick}
              />

              <MenuItem value={Section.WEARABLES_SKIN} currentValue={section} onClick={handleOnSectionClick} nestedLevel={1} />
            </>
          ) : null}
        </>
      )}
      {shouldRenderSection(Section.EMOTES, sections) && (
        <>
          <MenuItem value={Section.EMOTES} currentValue={section} onClick={handleOnSectionClick} />
          {[
            Section.EMOTES,
            Section.EMOTES_DANCE,
            Section.EMOTES_POSES,
            Section.EMOTES_FUN,
            Section.EMOTES_GREETINGS,
            Section.EMOTES_HORROR,
            Section.EMOTES_MISCELLANEOUS,
            Section.EMOTES_STUNT,
            Section.EMOTES_REACTIONS
          ].includes(section!)
            ? [
                Section.EMOTES_DANCE,
                Section.EMOTES_POSES,
                Section.EMOTES_FUN,
                Section.EMOTES_GREETINGS,
                Section.EMOTES_HORROR,
                Section.EMOTES_MISCELLANEOUS,
                Section.EMOTES_STUNT,
                Section.EMOTES_REACTIONS
              ].map(menuSection => (
                <MenuItem key={menuSection} value={menuSection} currentValue={section} onClick={handleOnSectionClick} nestedLevel={1} />
              ))
            : null}
        </>
      )}
      {shouldRenderSection(Section.ENS, sections) && <MenuItem value={Section.ENS} currentValue={section} onClick={handleOnSectionClick} />}
    </>
  )
}

export default React.memo(NFTSectionsMenuItems)

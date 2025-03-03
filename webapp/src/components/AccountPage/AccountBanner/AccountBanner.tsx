import React, { useState, useEffect } from 'react'
import { Back, Container, Loader } from 'decentraland-ui'
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import { Profile } from 'decentraland-dapps/dist/containers'
import { isMobile } from 'decentraland-dapps/dist/lib/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { PageHeader } from '../../PageHeader'
import { Column } from '../../Layout/Column'
import { Props } from './AccountBanner.types'
import { useTimer } from '../../../lib/timer'
import { getIsValidLink } from '../../../modules/store/utils'
import { LinkType } from '../../../modules/store/types'
import { shortenAddress } from '../../../modules/wallet/utils'
import ExternalLinkModal from '../../ExternalLinkModal'
import copyText from '../../../lib/copyText'

import './AccountBanner.css'

const AccountBanner = ({ address, store, isLoading, onBack, onFetchStore }: Props) => {
  const [hasCopiedAddress, setHasCopied] = useTimer(1200)

  const [openExternalLinkModal, setOpenExternalLinkModal] = useState<string>()

  useEffect(() => {
    onFetchStore(address)
  }, [onFetchStore, address])

  const renderLink = (type: LinkType) =>
    store?.[type] &&
    getIsValidLink(type, store[type]) && <div className={classNames('icon', type)} onClick={() => setOpenExternalLinkModal(store[type])} />

  return (
    <>
      <PageHeader className="AccountBanner">
        {isLoading ? (
          <Loader size="massive" active />
        ) : (
          <>
            {store?.cover && <img className="cover" src={store.cover} alt="cover" />}
            <Container>
              <div className="cover-top">
                <Back onClick={onBack} />
                <div className="icons">
                  {renderLink(LinkType.WEBSITE)}
                  {renderLink(LinkType.FACEBOOK)}
                  {renderLink(LinkType.TWITTER)}
                  {renderLink(LinkType.DISCORD)}
                </div>
              </div>
            </Container>
            <Column>
              <Profile address={address} imageOnly inline={false} size="huge" />
              <div className="profile-name">
                <Profile address={address} textOnly inline={false} />
              </div>
              <div className="profile-address">
                <div className="profile-address-hash">{shortenAddress(address)}</div>
                {!isMobile() && (
                  <div>
                    <Icon
                      onClick={() => copyText(address, setHasCopied)}
                      aria-label="Copy address"
                      aria-hidden="false"
                      className="copy"
                      name="copy outline"
                    />
                    {hasCopiedAddress && <span className="profile-copied-text-desktop copied">{t('account_page.copied')}</span>}
                  </div>
                )}
              </div>
              {isMobile() && (
                <div className="profile-copy-text-mobile">
                  <div role="button" aria-label="copy" onClick={() => copyText(address, setHasCopied)}>
                    {hasCopiedAddress ? (
                      <span className="copied">{t('account_page.copied_capitalized')}</span>
                    ) : (
                      <span className="copy">{t('account_page.copy_address')}</span>
                    )}
                  </div>
                </div>
              )}
              {store?.description && <div className="description">{store.description}</div>}
            </Column>
          </>
        )}
      </PageHeader>
      {openExternalLinkModal && <ExternalLinkModal link={openExternalLinkModal} onClose={() => setOpenExternalLinkModal(undefined)} />}
    </>
  )
}

export default React.memo(AccountBanner)

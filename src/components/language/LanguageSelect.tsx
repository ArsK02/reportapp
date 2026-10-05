import React, { forwardRef } from 'react';

import { useTranslation } from 'react-i18next';

import { languages } from '../../../localization';

import BottomSheetSelect from '../bottomSheetSelect/BottomSheetSelect';
import BottomSheetSelectItem from '../bottomSheetSelect/BottomSheetSelectItem';

type Props = {
  ref: any;
};

type LangItem = {
  name: string;
  slug: string;
};

const LanguageSelect: React.FC<Props> = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  const langs: LangItem[] = languages.map((lang) => ({
    name: t(lang),
    slug: lang,
  }));

  return (
    <BottomSheetSelect ref={ref}>
      {langs?.length &&
        langs.map((item: LangItem, index: number) => (
          <BottomSheetSelectItem
            item={item.name}
            isActive={item.slug === i18n.resolvedLanguage}
            onPress={() => i18n.changeLanguage(item.slug)}
            key={index}
          />
        ))}
    </BottomSheetSelect>
  );
});

LanguageSelect.displayName = 'LanguageSelect';

export default LanguageSelect;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import './style.scss'
import DownOutlinedIcon from '@ant-design/icons/lib/icons/DownOutlined'
import { LoadingOutlined } from '@ant-design/icons'

export interface IAccordion<T = { [P in string]: any }> {
  title: string
  open?: boolean
  items: Array<T>
  loadingItem?: boolean
  disabled?: boolean
  renderItem: (record: T, index: number) => React.ReactNode
  onChange?: (open: boolean) => void
}

export default function Accordion<T>(props: IAccordion<T>) {
  const [open, setOpen] = useState<boolean>(false)
  const isOpen = typeof props.open === 'boolean' ? props.open : !!open

  return (
    <div>
      <div>
        <a
          onClick={() =>
            !props.disabled && typeof props.onChange === 'function'
              ? props.onChange(!isOpen)
              : setOpen(!open)
          }
          className="afx-accord-header"
          data-visible={isOpen ? '1' : '0'}
          data-disabled={props.disabled ? '1' : '0'}
          data-active={props.open ? '1' : '0'}
        >
          <p className="text-xl font-[500]">{props.title}</p>

          {!!props.loadingItem && isOpen ? (
            <div className="rounded-full bg-white p-1.5">
              <LoadingOutlined className="text-[26px] !text-blue-400 text-right" />
            </div>
          ) : (
            <DownOutlinedIcon className="icon-arrow-rotate" />
          )}
        </a>
      </div>
      <div
        className="afx-accord-content pl-6 flex flex-col gap-y-2"
        data-visible={isOpen ? '1' : '0'}
      >
        {!props.loadingItem &&
          props.items?.map((a, index) => (
            <div className="afx-accord-items" key={`item-accr-[${index}]`}>
              {props.renderItem(a, index)}
            </div>
          ))}
      </div>
    </div>
  )
}

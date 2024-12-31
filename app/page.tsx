'use client';

import { use, useEffect, useRef, useState } from 'react';

export default function Page() {
  // 時間
  const [time, setTime] = useState<number>(2);
  // 状態
  enum Status {
    PROGRESS = 'PROGRESS',
    STOP = 'STOP',
  }
  const [status, setStatus] = useState<Status>(Status.PROGRESS);
  // ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('status:', status);
    if (status === Status.PROGRESS) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev < 1) {
            clearInterval(intervalRef.current!);
            setStatus(Status.STOP);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (status === Status.STOP && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  useEffect(() => {
    console.log('time:', time);
  }, [time]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '72px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {time}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            name="分"
            onClick={() => {
              console.log('分');
            }}
          />
          <div
            style={{
              width: '4px',
            }}
          ></div>
          <Button
            name="秒"
            onClick={() => {
              console.log('秒');
            }}
          />
          <div
            style={{
              width: '4px',
            }}
          ></div>
          <Button
            name="スタート"
            onClick={() => {
              console.log('スタート');
            }}
          />
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  name: string;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  const { name, onClick } = props;
  return (
    <button
      style={{
        width: '150px',
        height: '60px',
        fontSize: '16px',
        border: '1px solid #ebebeb',
        backgroundColor: '#f6f6f6',
        borderRadius: '8px',
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

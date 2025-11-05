import { ClerkProvider, SignIn } from '@clerk/nextjs'

export function DisplayClerk() {
  return (
    <ClerkProvider>
        <div>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: {
                  fontSize: 14,
                  textTransform: 'none',
                  backgroundColor: '#611BBD',
                  '&:hover, &:focus, &:active': {
                    backgroundColor: '#49247A',
                  },
                },
              },
            }}
          />
        </div>
    </ClerkProvider>
  )
}